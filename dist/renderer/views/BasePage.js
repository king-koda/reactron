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
const react_2 = __importStar(require("react"));
const gr_1 = require("react-icons/gr");
const IconAndText_1 = __importDefault(require("../components/icons/IconAndText"));
const PageBG_1 = require("../components/PageBG");
const PageBody_1 = require("../components/PageBody");
const PageNavbar_1 = require("../components/PageNavbar");
const BasePage = ({ children }) => {
    const [hashIndex, setHashIndex] = (0, react_2.useState)(0);
    const [toBeDeleted, setToBeDeleted] = (0, react_2.useState)([]);
    const [ht, setHt] = (0, react_2.useState)(undefined);
    const [photos, setPhotos] = (0, react_2.useState)(undefined);
    const [rootFolder, setRootFolder] = (0, react_2.useState)('');
    const [focusedImage, setFocusedImage] = (0, react_2.useState)(undefined);
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
    console.log('ht 0', ht);
    console.log('photos', photos);
    console.log('rootFolderrootFolder', rootFolder);
    console.log('toBeDeleted', toBeDeleted);
    return (react_2.default.createElement(PageBG_1.PageBG, { bgColor: '#B0E0E6', width: '100%', height: '100%' },
        react_2.default.createElement(PageNavbar_1.PageNavbar, { height: '15%', width: '100%', bgColor: 'rgba(0, 0, 0, 0.0)' },
            react_2.default.createElement(react_1.Flex, { justifyContent: 'space-evenly', width: '100%', align: 'center' },
                react_2.default.createElement(react_1.Flex, { width: '50%', direction: 'column', height: '100%', overflow: 'hidden', borderRight: 'solid 6px black', padding: 4, justifyContent: 'space-between' },
                    react_2.default.createElement(react_1.Flex, { width: '100%', direction: 'row' },
                        react_2.default.createElement(react_1.Text, { fontWeight: 'bold', fontSize: '20px', whiteSpace: 'nowrap', minWidth: '20%' }, "Root Folder:"),
                        rootFolder && (react_2.default.createElement(react_1.Tooltip, { label: rootFolder, placement: 'top' },
                            react_2.default.createElement("span", null,
                                react_2.default.createElement(react_1.Text, { fontSize: '20px', fontWeight: 'bold', paddingX: '6px', width: '90%', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }, rootFolder))))),
                    react_2.default.createElement(react_1.Flex, { width: '100%', direction: 'row' },
                        react_2.default.createElement(react_1.Text, { fontWeight: 'bold', fontSize: '20px', whiteSpace: 'nowrap', minWidth: '20%' }, "Hash:"),
                        ht && (react_2.default.createElement(react_1.Tooltip, { label: ht?.htKeys[hashIndex], placement: 'top' },
                            react_2.default.createElement("span", null,
                                react_2.default.createElement(react_1.Text, { fontSize: '20px', fontWeight: 'bold', paddingX: '6px', width: '70%', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }, ht?.htKeys[hashIndex]))))),
                    react_2.default.createElement(react_1.Flex, { width: '100%', direction: 'row' },
                        react_2.default.createElement(react_1.Text, { fontWeight: 'bold', fontSize: '20px', whiteSpace: 'nowrap', minWidth: '20%' }, "Duplicates:"),
                        ht && (react_2.default.createElement(react_1.Text, { fontSize: '20px', fontWeight: 'bold', paddingX: '6px', width: 'auto' }, ht?.extra?.totalFiles)))),
                react_2.default.createElement(react_1.Flex, { width: '50%', align: 'left', direction: 'row' },
                    react_2.default.createElement(react_1.Flex, null,
                        react_2.default.createElement(IconAndText_1.default, { icon: gr_1.GrSelect, text: 'Select Root Folder', onClick: async () => await window.electronAPI
                                .rootFolderSelect()
                                .then((result) => setRootFolder(result))
                                .catch((err) => console.log('prev duplicate get error:', err)) })),
                    react_2.default.createElement(react_1.Flex, null,
                        react_2.default.createElement(IconAndText_1.default, { icon: gr_1.GrScan, text: 'Scan for Duplicates', onClick: async () => {
                                await window.electronAPI
                                    .walkFs(rootFolder)
                                    .then(async (result) => {
                                    console.log('walkFs FE result:', result);
                                    const jsonParsedResult = JSON.parse(result);
                                    const htResult = jsonParsedResult;
                                    setHt(jsonParsedResult);
                                    setHashIndex(0);
                                    setPhotos(await window.electronAPI
                                        .getPhotos(htResult?.htKeys?.[0])
                                        .then()
                                        .catch((err) => console.log('prev duplicate get error:', err)));
                                })
                                    .catch((err) => js_logger_1.default.debug('fuck button error: ', err));
                            } })),
                    react_2.default.createElement(react_1.Flex, null,
                        react_2.default.createElement(IconAndText_1.default, { icon: gr_1.GrChapterPrevious, onClick: ht
                                ? async () => {
                                    if (hashIndex !== 0) {
                                        setToBeDeleted([]);
                                        setHashIndex(hashIndex - 1);
                                        setPhotos(await window.electronAPI
                                            .getPhotos(ht?.htKeys[hashIndex - 1])
                                            .then()
                                            .catch((err) => console.log('prev duplicate get error:', err)));
                                    }
                                    else {
                                        alert('Already at the first duplicate!');
                                    }
                                }
                                : () => { }, text: 'Previous Duplicate' })),
                    react_2.default.createElement(react_1.Flex, null,
                        react_2.default.createElement(IconAndText_1.default, { icon: gr_1.GrChapterNext, onClick: ht
                                ? async () => {
                                    if (ht && ht?.htKeys?.length - 1 !== hashIndex) {
                                        setToBeDeleted([]);
                                        setHashIndex(hashIndex + 1);
                                        setPhotos(await window.electronAPI
                                            .getPhotos(ht?.htKeys[hashIndex + 1])
                                            .then()
                                            .catch((err) => console.log('next duplicate get error:', err)));
                                    }
                                    else {
                                        alert('No more duplicates!');
                                    }
                                }
                                : () => { }, text: 'Next Duplicate' }))))),
        react_2.default.createElement(PageBody_1.PageBody, { left: '0%', top: '15%', width: '100%', height: '85%', 
            // height='85%'
            borderBottom: 'solid 6px black', borderLeft: 'solid 6px black', id: 'pg-body', direction: 'row' }, photos && photos?.length >= 0 && (react_2.default.createElement(react_2.default.Fragment, null,
            react_2.default.createElement(react_1.Flex, { height: '100%', id: 'focused-image-flex', width: '70%', borderRight: 'solid 4px black', direction: 'column' },
                react_2.default.createElement(react_1.Image, { height: '80%', padding: '5', id: 'focused-image', objectFit: 'contain', src: `data:image/jpg;base64,${focusedImage?.image}` }),
                react_2.default.createElement(react_1.Flex, { id: 'focused-image-info', height: '20%', borderTop: 'solid 4px black', width: '100%', top: '80%', align: 'center', justifyContent: 'space-evenly', direction: 'column' },
                    react_2.default.createElement(react_1.Flex, { id: 'focused-image-info-header', direction: 'row', width: '100%', align: 'center', textAlign: 'center', justifyContent: 'space-evenly', borderBottom: '4px solid black', 
                        // paddingBottom='4'
                        fontWeight: 'bold', height: '20%' },
                        react_2.default.createElement(react_1.Text, { fontSize: '16px', width: '25%' }, "Location/ Name"),
                        react_2.default.createElement(react_1.Text, { fontSize: '16px', width: '25%' }, "Size (kB)"),
                        react_2.default.createElement(react_1.Text, { fontSize: '16px', width: '25%' }, "Resolution (H x W)"),
                        react_2.default.createElement(react_1.Text, { fontSize: '16px', width: '25%' }, "Created at")),
                    react_2.default.createElement(react_1.Flex, { id: 'focused-image-info-body', direction: 'row', width: '100%', align: 'center', textAlign: 'center', height: '80%' },
                        react_2.default.createElement(react_1.Text, { fontSize: '16px', width: '25%' }, focusedImage?.value),
                        react_2.default.createElement(react_1.Text, { fontSize: '16px', width: '25%' }, Math.ceil(focusedImage?.stats?.size / 1024)),
                        react_2.default.createElement(react_1.Text, { fontSize: '16px', width: '25%' },
                            focusedImage?.stats?.width,
                            " x ",
                            focusedImage?.stats?.height),
                        react_2.default.createElement(react_1.Text, { fontSize: '16px', width: '25%' }, focusedImage?.stats?.birthtime?.toString())))),
            react_2.default.createElement(react_1.Flex, { id: 'defocused-image-flex', direction: 'column', width: '30%', height: '100%', overflowY: 'scroll' }, photos?.map((photo, index) => {
                return (react_2.default.createElement(react_1.Flex, { id: `preview-defocused-image-flex-${index}`, minHeight: '33.33%', width: `100%`, border: `${photo?.value === focusedImage?.value
                        ? 'solid 6px magenta'
                        : 'solid 4px black'}`, direction: 'row' },
                    react_2.default.createElement(react_1.Flex, { width: '50%', id: `preview-image-flex-${index}`, height: '100%' },
                        react_2.default.createElement(react_1.Flex, { id: `overlay-${index}`, position: 'sticky', direction: 'column', height: '100%', justifyContent: 'space-between' },
                            react_2.default.createElement(react_1.Flex, { direction: 'column', position: 'relative' },
                                photo?.value ===
                                    sortPhotos?.highestResPhoto?.value && (react_2.default.createElement(react_1.Tooltip, { title: 'high-res-icon', label: 'Highest Resolution', placement: 'top' },
                                    react_2.default.createElement("span", null,
                                        react_2.default.createElement(react_1.Icon, { id: `highest-resolution-icon-${index}`, as: gr_1.GrAchievement, width: '30px', height: '30px', margin: '1' })))),
                                photo?.value ===
                                    sortPhotos?.highestSizePhoto?.value && (react_2.default.createElement(react_1.Tooltip, { title: 'high-size-icon', label: 'Highest Size', placement: 'top' },
                                    react_2.default.createElement("span", null,
                                        react_2.default.createElement(react_1.Icon, { id: `highest-size-icon-${index}`, as: gr_1.GrAction, width: '30px', height: '30px', margin: '1' }))))),
                            react_2.default.createElement(react_1.Tooltip, { title: 'single-delete-icon', label: 'Mark for Deletion', placement: 'top' },
                                react_2.default.createElement("span", null,
                                    react_2.default.createElement(react_1.Icon, { as: gr_1.GrFormClose, width: '30px', height: '30px', _hover: { bgColor: 'red' }, _active: { bgColor: 'yellow' }, margin: '1', zIndex: '3', 
                                        // alignSelf={'flex-end'}
                                        onClick: () => {
                                            if (!toBeDeleted?.includes(photo?.value)) {
                                                setToBeDeleted([
                                                    ...toBeDeleted,
                                                    photo?.value,
                                                ]);
                                            }
                                        } })))),
                        react_2.default.createElement(react_1.Image, { id: `preview-image-${index}`, width: '100%', height: '100%', objectFit: 'contain', padding: '5', ml: '-10', onClick: () => {
                                setFocusedImage(photo);
                            }, src: `data:image/jpg;base64,${photo?.image}` })),
                    react_2.default.createElement(react_1.Flex, { width: '50%', id: `preview-image-info-${index}`, direction: 'column', justifyContent: 'space-between', onClick: () => {
                            setFocusedImage(photo);
                        } },
                        react_2.default.createElement(react_1.Flex, { direction: 'row', width: '100%', id: `preview-image-info-location-${index}`, maxHeight: '30%', textOverflow: 'ellipsis', overflow: 'auto' },
                            react_2.default.createElement(react_1.Text, { fontSize: '12px', width: '25%', fontWeight: 'bold' }, "Location/ Name"),
                            react_2.default.createElement(react_1.Text, { fontSize: '12px', width: '75%' }, photo?.value)),
                        react_2.default.createElement(react_1.Flex, { direction: 'row', width: '100%', id: `preview-image-info-size-${index}`, maxHeight: '20%', overflow: 'auto' },
                            react_2.default.createElement(react_1.Text, { fontSize: '12px', width: '25%', fontWeight: 'bold' }, "Size (kB)"),
                            react_2.default.createElement(react_1.Text, { fontSize: '12px', width: '75%' }, Math.ceil(photo?.stats?.size / 1024))),
                        react_2.default.createElement(react_1.Flex, { direction: 'row', width: '100%', id: `preview-image-info-resolution-${index}`, maxHeight: '20%', overflow: 'auto' },
                            react_2.default.createElement(react_1.Text, { fontSize: '12px', width: '25%', fontWeight: 'bold' }, "Resolution (H x W)"),
                            react_2.default.createElement(react_1.Text, { fontSize: '12px', width: '75%' },
                                photo?.stats?.width,
                                " x ",
                                photo?.stats?.height)),
                        react_2.default.createElement(react_1.Flex, { direction: 'row', width: '100%', id: `preview-image-info-created-${index}`, maxHeight: '30%', overflow: 'auto' },
                            react_2.default.createElement(react_1.Text, { fontSize: '12px', width: '25%', fontWeight: 'bold' }, "Created at"),
                            react_2.default.createElement(react_1.Text, { fontSize: '12px', width: '75%' }, photo?.stats?.birthtime?.toString())))));
            })))))));
};
exports.BasePage = BasePage;
//# sourceMappingURL=BasePage.js.map