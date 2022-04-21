"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasePage = void 0;
const react_1 = require("@chakra-ui/react");
const js_logger_1 = __importDefault(require("js-logger"));
const lodash_1 = require("lodash");
const react_2 = __importStar(require("react"));
const bs_1 = require("react-icons/bs");
const gr_1 = require("react-icons/gr");
const md_1 = require("react-icons/md");
const IconAndTextWithTooltip_1 = require("../components/IconAndTextWithTooltip");
const PageBG_1 = require("../components/PageBG");
const PageBody_1 = require("../components/PageBody");
const PageNavbar_1 = require("../components/PageNavbar");
const TextBody_1 = require("../components/TextBody");
const TextHeader_1 = require("../components/TextHeader");
const TextWithTooltip_1 = require("../components/TextWithTooltip");
const BasePage = ({ children }) => {
    const [hashIndex, setHashIndex] = (0, react_2.useState)(0);
    //marked for deletion list
    const [toBeDeleted, setToBeDeleted] = (0, react_2.useState)([]);
    //hashes and their file locations
    const [ht, setHt] = (0, react_2.useState)(undefined);
    //photos and their info
    const [photos, setPhotos] = (0, react_2.useState)(undefined);
    const [rootFolder, setRootFolder] = (0, react_2.useState)('');
    //checkboxes
    const [keepHighestResolution, setKeepHighestResolution] = (0, react_2.useState)(false);
    const [keepHighestSize, setKeepHighestSize] = (0, react_2.useState)(false);
    const [autoMarkAll, setAutoMarkAll] = (0, react_2.useState)(false);
    const [autoDeleteOnFolderChange, setAutoDeleteOnFolderChange] = (0, react_2.useState)(false);
    const [markedAll, setMarkedAll] = (0, react_2.useState)(false);
    //main image preview
    const [focusedImage, setFocusedImage] = (0, react_2.useState)(undefined);
    const toast = (0, react_1.useToast)();
    const sortPhotos = (0, react_2.useMemo)(() => {
        if (photos) {
            let highestResPhoto = photos[0];
            let highestSizePhoto = photos[0];
            photos?.map((photo, index) => {
                if (photo?.stats?.height * photo?.stats?.width >
                    highestResPhoto?.stats?.height * highestResPhoto?.stats?.width) {
                    highestResPhoto = photos[index];
                    //TODO: if photo size is biggest, set photo to biggest, compare other photos with biggest, if photo is newest, set as newest, if photo has best resolution set it as best resolution
                }
                if (photo?.stats?.size > highestSizePhoto?.stats?.size) {
                    highestSizePhoto = photos[index];
                    //TODO: if photo is newest, set as newest
                }
            });
            setFocusedImage(highestResPhoto);
            return { highestResPhoto, highestSizePhoto };
        }
    }, [photos]);
    const markAllForDeletion = () => {
        if (photos) {
            if (!markedAll) {
                console.log('photos', photos);
                const filteredPhotos = photos?.filter((photo) => {
                    if ((keepHighestResolution &&
                        photo?.value === sortPhotos?.highestResPhoto?.value) ||
                        (keepHighestSize &&
                            photo?.value === sortPhotos?.highestSizePhoto?.value)) {
                        console.log('EEEE');
                        return;
                    }
                    return photo?.value;
                });
                console.log('filteredPhotos', filteredPhotos);
                setToBeDeleted(() => {
                    return filteredPhotos?.map((photo) => {
                        return photo?.value;
                    });
                });
                setMarkedAll(true);
            }
            if (markedAll) {
                setToBeDeleted([]);
                setMarkedAll(false);
            }
        }
    };
    const triggerMarkAllForDeletion = (0, react_2.useMemo)(() => {
        if (autoMarkAll)
            markAllForDeletion();
    }, [photos, autoMarkAll]);
    const deleteDuplicates = async (toBeDeleted) => {
        return await window.electronAPI
            .deleteDuplicates(toBeDeleted)
            .then(async (result) => {
            console.log('files deleted:', result);
        })
            .catch((err) => console.error('fuck button error: ', err));
    };
    const nextDuplicate = async () => {
        if (ht && ht?.htKeys?.length - 1 !== hashIndex) {
            if (autoDeleteOnFolderChange)
                await deleteDuplicates(toBeDeleted);
            setToBeDeleted([]);
            setHashIndex(hashIndex + 1);
            const newPhotoSet = await window.electronAPI
                .getPhotos(ht?.htKeys[hashIndex + 1])
                .then()
                .catch((err) => console.error('next duplicate get error:', err));
            setMarkedAll(false);
            setPhotos(newPhotoSet);
            return true;
        }
        return false;
    };
    const previousDuplicate = async () => {
        if (hashIndex !== 0) {
            if (autoDeleteOnFolderChange)
                await deleteDuplicates(toBeDeleted);
            setToBeDeleted([]);
            setHashIndex(hashIndex - 1);
            const newPhotoSet = await window.electronAPI
                .getPhotos(ht?.htKeys[hashIndex - 1])
                .then()
                .catch((err) => console.error('prev duplicate get error:', err));
            setMarkedAll(false);
            setPhotos(newPhotoSet);
            return true;
        }
        return false;
    };
    const toggleKeepHighestSize = () => {
        if (toBeDeleted?.includes(sortPhotos?.highestSizePhoto?.value)) {
            let oldToBeDeleted = (0, lodash_1.cloneDeep)(toBeDeleted);
            let newToBeDeleted = oldToBeDeleted?.filter((tbd) => {
                return !(tbd === sortPhotos?.highestSizePhoto?.value);
            });
            setToBeDeleted(newToBeDeleted);
        }
        setKeepHighestSize(!keepHighestSize);
        return true;
    };
    const toggleKeepHighestResolution = () => {
        if (toBeDeleted?.includes(sortPhotos?.highestResPhoto?.value)) {
            let oldToBeDeleted = (0, lodash_1.cloneDeep)(toBeDeleted);
            let newToBeDeleted = oldToBeDeleted?.filter((tbd) => {
                return !(tbd === sortPhotos?.highestResPhoto?.value);
            });
            setToBeDeleted(newToBeDeleted);
        }
        setKeepHighestResolution(!keepHighestResolution);
        return true;
    };
    const scanForDuplicates = async () => {
        return await window.electronAPI
            .walkFs(rootFolder)
            .then(async (result) => {
            const jsonParsedResult = JSON.parse(result);
            const htResult = jsonParsedResult;
            setHt(jsonParsedResult);
            setHashIndex(0);
            setPhotos(await window.electronAPI
                .getPhotos(htResult?.htKeys?.[0])
                .then()
                .catch((err) => console.error('prev duplicate get error:', err)));
            return result;
        })
            .catch((err) => js_logger_1.default.debug('fuck button error: ', err));
    };
    const rootFolderSelect = async () => {
        return await window.electronAPI
            .rootFolderSelect()
            .then((result) => {
            setRootFolder(result);
            return true;
        })
            .catch((err) => console.error('prev duplicate get error:', err));
    };
    const markForDeletion = (photo) => {
        if (!toBeDeleted?.includes(photo?.value)) {
            setToBeDeleted([...toBeDeleted, photo?.value]);
        }
        else {
            let oldToBeDeleted = (0, lodash_1.cloneDeep)(toBeDeleted);
            const newToBeDeleted = (0, lodash_1.filter)(oldToBeDeleted, (path) => {
                return !(path === photo?.value);
            });
            setToBeDeleted(newToBeDeleted);
        }
    };
    return (react_2.default.createElement(PageBG_1.PageBG, { bgColor: 'blue.400' },
        react_2.default.createElement(PageNavbar_1.PageNavbar, { height: '15%', width: '100%', bgColor: 'hsla(0, 0%, 0%, 0)', justifyContent: 'space-evenly', align: 'center' },
            react_2.default.createElement(react_1.Flex, { width: '50%', direction: 'column', height: '100%', borderRight: 'solid 4px darkblue', padding: 4, justifyContent: 'space-between' },
                react_2.default.createElement(react_1.Flex, { width: '100%', direction: 'row', align: 'center' },
                    react_2.default.createElement(TextHeader_1.TextHeader, null, "Root Folder:"),
                    rootFolder && (react_2.default.createElement(TextWithTooltip_1.TextWithTooltip, { tooltipProps: { label: rootFolder }, fontSize: '24px', fontWeight: 'bold', paddingX: '6px' }, rootFolder))),
                react_2.default.createElement(react_1.Flex, { id: 'current-hash', width: '100%', direction: 'row', align: 'center' },
                    react_2.default.createElement(TextHeader_1.TextHeader, null, "Hash:"),
                    ht && (react_2.default.createElement(TextWithTooltip_1.TextWithTooltip, { paddingX: '6px', fontWeight: 'bold', fontSize: '24px', tooltipProps: { label: ht?.htKeys[hashIndex] } }, ht?.htKeys[hashIndex]))),
                react_2.default.createElement(react_1.Flex, { id: 'duplicate-info-flex', width: '100%', direction: 'row', align: 'center' },
                    react_2.default.createElement(TextHeader_1.TextHeader, null, "Duplicates:"),
                    ht && (react_2.default.createElement(TextBody_1.TextBody, { paddingX: '6px', fontSize: '24px', fontWeight: 'bold' }, ht?.extra?.totalFiles)))),
            react_2.default.createElement(react_1.Flex, { width: '50%', align: 'center', direction: 'row', justifyContent: 'space-between', height: '100%' },
                react_2.default.createElement(react_1.Flex, { direction: 'column', height: '100%', borderRight: 'solid 4px darkblue', align: 'center' },
                    react_2.default.createElement(IconAndTextWithTooltip_1.IconAndTextWithTooltip, { tooltipProps: {
                            id: 'select-root-folder-button',
                            label: 'Select Root Folder',
                        }, icon: gr_1.GrSelect, onClick: async () => {
                            if (await rootFolderSelect()) {
                                toast({
                                    title: 'Success:',
                                    description: 'Selecting Root Folder.',
                                    status: 'success',
                                    duration: 2000,
                                    isClosable: true,
                                });
                            }
                            else {
                                toast({
                                    title: 'Error:',
                                    description: 'Selecting Root Folder.',
                                    status: 'error',
                                    duration: 2000,
                                    isClosable: true,
                                });
                            }
                        } }),
                    react_2.default.createElement(IconAndTextWithTooltip_1.IconAndTextWithTooltip, { tooltipProps: {
                            id: 'scan-for-duplicates-button',
                            label: 'Scan for Duplicates',
                        }, icon: gr_1.GrScan, isDisabled: !rootFolder, onClick: async () => {
                            if (await scanForDuplicates()) {
                                toast({
                                    title: 'Success:',
                                    description: 'Scanning for Duplicates.',
                                    status: 'success',
                                    duration: 2000,
                                    isClosable: true,
                                });
                            }
                            else {
                                toast({
                                    title: 'Error:',
                                    description: 'Scanning for Duplicates.',
                                    status: 'error',
                                    duration: 2000,
                                    isClosable: true,
                                });
                            }
                        } })),
                react_2.default.createElement(react_1.Flex, { id: 'settings', direction: 'column', height: '100%', width: '100%' },
                    react_2.default.createElement(react_1.Flex, { direction: 'row', width: '100%', borderBottom: 'solid 4px darkblue', height: '30%', align: 'center', justifyContent: 'center' },
                        react_2.default.createElement(react_1.Text, { height: '100%', fontSize: '30px', alignSelf: 'center', fontWeight: 'black' }, "Config")),
                    react_2.default.createElement(react_1.Flex, { direction: 'column', height: '70%', width: '100%', overflow: 'auto' },
                        react_2.default.createElement(react_1.Flex, null,
                            react_2.default.createElement(react_1.Icon, { height: '30px', width: '30px', as: md_1.MdSelectAll, paddingX: 1 }),
                            react_2.default.createElement(react_1.Text, { fontSize: '20px', fontWeight: 'bold' }, "Mark all for Deletion Options:")),
                        react_2.default.createElement(react_1.Checkbox, { fontSize: '18px', paddingX: 1, isChecked: keepHighestResolution, onChange: () => {
                                toggleKeepHighestResolution();
                                if (!keepHighestResolution) {
                                    toast({
                                        title: 'Success:',
                                        description: 'Keep Highest Resolution Toggled ON.',
                                        status: 'success',
                                        duration: 2000,
                                        isClosable: true,
                                    });
                                }
                                if (keepHighestResolution) {
                                    toast({
                                        title: 'Warning:',
                                        description: 'Keep Highest Resolution Toggled OFF.',
                                        status: 'warning',
                                        duration: 2000,
                                        isClosable: true,
                                    });
                                }
                            } },
                            react_2.default.createElement(react_1.Text, { fontSize: '18px' }, "Keep Highest Resolution Photo")),
                        react_2.default.createElement(react_1.Checkbox, { paddingX: 1, isChecked: keepHighestSize, onChange: () => {
                                if (toggleKeepHighestSize()) {
                                    if (!keepHighestSize) {
                                        toast({
                                            title: 'Success:',
                                            description: 'Keep Highest Size Toggled ON.',
                                            status: 'success',
                                            duration: 2000,
                                            isClosable: true,
                                        });
                                    }
                                    if (keepHighestSize) {
                                        toast({
                                            title: 'Warning:',
                                            description: 'Keep Highest Size Toggled OFF.',
                                            status: 'warning',
                                            duration: 2000,
                                            isClosable: true,
                                        });
                                    }
                                }
                            } },
                            react_2.default.createElement(react_1.Text, { fontSize: '18px' }, "Keep Highest Size Photo")),
                        react_2.default.createElement(react_1.Checkbox, { fontSize: '18px', paddingX: 1, isChecked: autoMarkAll, onChange: () => {
                                if (!autoMarkAll)
                                    alert('WARNING: Pressing Next/ Previous will now automatically mark all photos for DELETION that match the config!');
                                setAutoMarkAll(!autoMarkAll);
                                if (!autoMarkAll) {
                                    toast({
                                        title: 'Success:',
                                        description: 'Auto Mark All Toggled ON.',
                                        status: 'success',
                                        duration: 2000,
                                        isClosable: true,
                                    });
                                }
                                if (autoMarkAll) {
                                    toast({
                                        title: 'Warning:',
                                        description: 'Auto Mark All Toggled OFF.',
                                        status: 'warning',
                                        duration: 2000,
                                        isClosable: true,
                                    });
                                }
                            } },
                            react_2.default.createElement(react_1.Text, { fontSize: '18px' }, "Auto Mark All")),
                        react_2.default.createElement(react_1.Checkbox, { fontSize: '18px', paddingX: 1, isChecked: autoDeleteOnFolderChange, onChange: () => {
                                if (!autoDeleteOnFolderChange)
                                    alert('WARNING: Pressing Next/ Previous will now automatically DELETE photos marked for DELETION!');
                                setAutoDeleteOnFolderChange(!autoDeleteOnFolderChange);
                                if (!autoDeleteOnFolderChange) {
                                    toast({
                                        title: 'Success:',
                                        description: 'Auto Delete Photos on Next/ Previous Toggled ON.',
                                        status: 'success',
                                        duration: 2000,
                                        isClosable: true,
                                    });
                                }
                                if (autoDeleteOnFolderChange) {
                                    toast({
                                        title: 'Warning:',
                                        description: 'Auto Delete Photos on Next/ Previous Toggled OFF.',
                                        status: 'warning',
                                        duration: 2000,
                                        isClosable: true,
                                    });
                                }
                            } },
                            react_2.default.createElement(react_1.Text, { fontSize: '18px' }, "Auto Delete Photos ON Next/ Previous")))),
                react_2.default.createElement(react_1.Flex, { direction: 'column', height: '100%' },
                    react_2.default.createElement(react_1.Flex, { direction: 'row', height: '50%', borderLeft: 'solid 4px darkblue' },
                        react_2.default.createElement(IconAndTextWithTooltip_1.IconAndTextWithTooltip, { tooltipProps: {
                                id: 'delete-button',
                                label: 'Delete',
                            }, icon: bs_1.BsTrash, isDisabled: !rootFolder || !photos || toBeDeleted?.length === 0, iconProps: { color: 'red' }, onClick: async () => {
                                if (photos && toBeDeleted?.length > 0) {
                                    //TODO: send tbd to backend, then refetch files for current hash -> maybe?
                                    await deleteDuplicates(toBeDeleted);
                                }
                            } }),
                        react_2.default.createElement(IconAndTextWithTooltip_1.IconAndTextWithTooltip, { tooltipProps: {
                                id: 'mark-all-for-deletion-button',
                                label: 'Mark all for Deletion',
                            }, icon: markedAll ? gr_1.GrUndo : md_1.MdSelectAll, isDisabled: !rootFolder || !photos, iconProps: { color: 'red' }, onClick: () => markAllForDeletion() })),
                    react_2.default.createElement(react_1.Flex, { direction: 'row', height: '50%', borderLeft: 'solid 4px darkblue' },
                        react_2.default.createElement(IconAndTextWithTooltip_1.IconAndTextWithTooltip, { tooltipProps: {
                                id: 'previous-duplicate-button',
                                label: 'Previous Duplicate',
                            }, icon: gr_1.GrChapterPrevious, isDisabled: !rootFolder || !photos || hashIndex === 0, onClick: async () => {
                                if (ht)
                                    await previousDuplicate();
                            } }),
                        react_2.default.createElement(IconAndTextWithTooltip_1.IconAndTextWithTooltip, { tooltipProps: {
                                id: 'next-duplicate-button',
                                label: 'Next Duplicate',
                            }, icon: gr_1.GrChapterNext, isDisabled: !rootFolder ||
                                !photos ||
                                !(ht && ht?.htKeys?.length - 1 !== hashIndex), onClick: () => {
                                if (ht)
                                    nextDuplicate();
                            } }))))),
        react_2.default.createElement(PageBody_1.PageBody, { left: '0%', top: '15%', width: '100%', height: '85%', borderBottom: 'solid 4px darkblue', borderLeft: 'solid 4px darkblue', id: 'pg-body', direction: 'row' }, photos && photos?.length >= 0 && (react_2.default.createElement(react_2.default.Fragment, null,
            react_2.default.createElement(react_1.Flex, { id: 'focused-image-flex', height: '100%', width: '70%', borderRight: 'solid 4px darkblue', direction: 'column' },
                react_2.default.createElement(react_1.Image, { height: '80%', padding: '5', id: 'focused-image', objectFit: 'contain', src: `data:image/jpg;base64,${focusedImage?.image}` }),
                react_2.default.createElement(react_1.Flex, { id: 'focused-image-info-flex', height: '20%', borderTop: 'solid 4px darkblue', width: '100%', top: '80%', direction: 'column' },
                    react_2.default.createElement(react_1.Flex, { id: 'focused-image-info-header', direction: 'row', width: '100%', align: 'center', textAlign: 'center', justifyContent: 'space-evenly', borderBottom: '4px solid darkblue', fontWeight: 'bold', height: '20%' },
                        react_2.default.createElement(TextHeader_1.TextHeader, { width: '25%' }, "Location"),
                        react_2.default.createElement(TextHeader_1.TextHeader, { width: '25%' }, "Size (kB)"),
                        react_2.default.createElement(TextHeader_1.TextHeader, { width: '25%' }, "Resolution (H x W)"),
                        react_2.default.createElement(TextHeader_1.TextHeader, { width: '25%' }, "Created at")),
                    react_2.default.createElement(react_1.Flex, { id: 'focused-image-info-body', direction: 'row', width: '100%', align: 'center', textAlign: 'center', height: '80%', padding: '2' },
                        react_2.default.createElement(TextBody_1.TextBody, { width: '25%' }, focusedImage?.value),
                        react_2.default.createElement(TextBody_1.TextBody, { width: '25%' }, Math.ceil(focusedImage?.stats?.size / 1024)),
                        react_2.default.createElement(TextBody_1.TextBody, { width: '25%' },
                            focusedImage?.stats?.width,
                            " x ",
                            focusedImage?.stats?.height),
                        react_2.default.createElement(TextBody_1.TextBody, { width: '25%' }, focusedImage?.stats?.birthtime?.toString())))),
            react_2.default.createElement(react_1.Flex, { id: 'defocused-image-flex', direction: 'column', width: '30%', height: '100%', overflowY: 'scroll', borderRight: 'solid 4px darkblue' }, photos?.map((photo, index) => {
                return (react_2.default.createElement(react_1.Flex, { id: `preview-defocused-image-flex-${index}`, minHeight: '33.33%', width: `100%`, borderBottom: photos?.length - 1 !== index
                        ? 'solid 4px darkblue'
                        : undefined, border: `${photo?.value === focusedImage?.value
                        ? 'solid 6px magenta'
                        : undefined}`, direction: 'row' },
                    react_2.default.createElement(react_1.Flex, { width: '50%', id: `preview-image-flex-left-${index}`, height: '100%' },
                        react_2.default.createElement(react_1.Flex, { id: `preview-image-flex-overlay-${index}`, position: 'sticky', direction: 'column', height: '100%', justifyContent: 'space-between' },
                            react_2.default.createElement(react_1.Flex, { direction: 'column', position: 'relative' },
                                photo?.value ===
                                    sortPhotos?.highestResPhoto?.value && (react_2.default.createElement(IconAndTextWithTooltip_1.IconAndTextWithTooltip, { tooltipProps: {
                                        title: 'high-res-icon',
                                        label: 'Highest Resolution',
                                    }, id: `highest-resolution-icon-${index}`, icon: gr_1.GrAchievement, width: '30px', height: '30px', iconProps: {
                                        margin: undefined,
                                        width: '30px',
                                        height: '30px',
                                    }, margin: '1', isButton: false })),
                                photo?.value ===
                                    sortPhotos?.highestSizePhoto?.value && (react_2.default.createElement(IconAndTextWithTooltip_1.IconAndTextWithTooltip, { tooltipProps: {
                                        title: 'high-size-icon',
                                        label: 'Highest Size',
                                    }, id: `highest-size-icon-${index}`, icon: gr_1.GrAction, width: '30px', height: '30px', iconProps: {
                                        margin: undefined,
                                        width: '30px',
                                        height: '30px',
                                    }, margin: '1', isButton: false }))),
                            react_2.default.createElement(react_1.Flex, { direction: 'column', position: 'relative' },
                                toBeDeleted?.includes(photo?.value) && (react_2.default.createElement(IconAndTextWithTooltip_1.IconAndTextWithTooltip, { tooltipProps: {
                                        title: 'marked-for-deletion-icon',
                                        label: 'Marked for Deletion',
                                    }, id: `marked-for-deletion-icon-${index}`, icon: bs_1.BsTrash, width: '30px', height: '30px', iconProps: {
                                        margin: undefined,
                                        width: '30px',
                                        height: '30px',
                                        color: 'red',
                                    }, margin: '1', isButton: false })),
                                react_2.default.createElement(IconAndTextWithTooltip_1.IconAndTextWithTooltip, { tooltipProps: {
                                        title: 'mark-for-deletion-icon',
                                        label: 'Mark for Deletion',
                                    }, id: `mark-for-deletion-icon-${index}`, icon: !toBeDeleted?.includes(photo?.value)
                                        ? gr_1.GrFormClose
                                        : gr_1.GrUndo, width: '30px', height: '30px', margin: '1', _hover: undefined, _active: undefined, iconProps: {
                                        margin: undefined,
                                        width: '30px',
                                        height: '30px',
                                        _hover: !toBeDeleted?.includes(photo?.value)
                                            ? { border: 'solid 2px red' }
                                            : { border: 'solid 2px darkgreen' },
                                        zIndex: '3',
                                        _active: !toBeDeleted?.includes(photo?.value)
                                            ? { bgColor: 'orangered' }
                                            : { bgColor: 'lightgreen' },
                                    }, onClick: () => {
                                        markForDeletion(photo);
                                    } }))),
                        react_2.default.createElement(react_1.Image, { id: `preview-image-${index}`, width: '100%', height: '100%', objectFit: 'contain', padding: '5', ml: '-10', onClick: () => {
                                setFocusedImage(photo);
                            }, src: `data:image/jpg;base64,${photo?.image}` })),
                    react_2.default.createElement(react_1.Flex, { width: '50%', id: `preview-image-info-${index}`, direction: 'column', justifyContent: 'space-between', padding: '2', onClick: () => {
                            setFocusedImage(photo);
                        } },
                        react_2.default.createElement(react_1.Flex, { direction: 'column', width: '100%', id: `preview-image-location-${index}`, maxHeight: '30%', textOverflow: 'ellipsis', overflow: 'auto' },
                            react_2.default.createElement(TextHeader_1.TextHeader, { fontSize: '16px', width: '100%' }, "Location"),
                            react_2.default.createElement(TextBody_1.TextBody, { fontSize: '14px', width: '100%' }, photo?.value)),
                        react_2.default.createElement(react_1.Flex, { direction: 'column', width: '100%', id: `preview-image-size-${index}`, maxHeight: '20%', overflow: 'auto' },
                            react_2.default.createElement(TextHeader_1.TextHeader, { fontSize: '16px', width: '100%' }, "Size (kB)"),
                            react_2.default.createElement(TextBody_1.TextBody, { fontSize: '14px', width: '100%' }, Math.ceil(photo?.stats?.size / 1024))),
                        react_2.default.createElement(react_1.Flex, { direction: 'column', width: '100%', id: `preview-image-resolution-${index}`, maxHeight: '20%', overflow: 'auto' },
                            react_2.default.createElement(TextHeader_1.TextHeader, { fontSize: '16px', width: '100%' }, "Resolution (H x W)"),
                            react_2.default.createElement(TextBody_1.TextBody, { fontSize: '14px', width: '100%' },
                                photo?.stats?.width,
                                " x ",
                                photo?.stats?.height)),
                        react_2.default.createElement(react_1.Flex, { direction: 'column', width: '100%', id: `preview-image-created-${index}`, maxHeight: '30%', overflow: 'auto' },
                            react_2.default.createElement(TextHeader_1.TextHeader, { fontSize: '16px', width: '100%' }, "Created at"),
                            react_2.default.createElement(TextBody_1.TextBody, { fontSize: '14px', width: '100%' }, photo?.stats?.birthtime?.toString())))));
            })))))));
};
exports.BasePage = BasePage;
//# sourceMappingURL=BasePage.js.map