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
const react_icons_1 = require("react-icons");
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
    console.log('toBeDeleted', toBeDeleted);
    return (react_2.default.createElement(PageBG_1.PageBG, { bgColor: '#B0E0E6' },
        react_2.default.createElement(react_1.Flex, { width: '100%', height: '100%' },
            react_2.default.createElement(PageNavbar_1.PageNavbar, { height: '15%', width: '100%', bgColor: 'rgba(0, 0, 0, 0.0)' },
                react_2.default.createElement(react_1.Flex, { justifyContent: 'space-evenly', width: '100%', align: 'center' },
                    react_2.default.createElement(react_1.Flex, { width: '50%', align: 'left', direction: 'column' },
                        react_2.default.createElement(react_1.Flex, { width: '50%', align: 'center', direction: 'row' },
                            react_2.default.createElement(react_1.Text, { fontWeight: 'bold', fontSize: '20px' }, "#"),
                            ht && (react_2.default.createElement(react_1.Text, { fontSize: '20px', fontWeight: 'bold', paddingX: '6px' }, ht?.htKeys[hashIndex]))),
                        react_2.default.createElement(react_1.Flex, { width: '50%', align: 'center', direction: 'row' },
                            react_2.default.createElement(react_1.Text, { fontWeight: 'bold', fontSize: '20px' }, "Total Scanned Files:"),
                            ht && (react_2.default.createElement(react_1.Text, { fontSize: '20px', fontWeight: 'bold', paddingX: '6px' }, ht?.extra?.totalFiles)))),
                    react_2.default.createElement(react_icons_1.IconContext.Provider, { value: { color: 'blue', size: '50px' } },
                        react_2.default.createElement(react_1.Flex, null,
                            react_2.default.createElement(IconAndText_1.default, { icon: gr_1.GrSelect, text: 'Select Root Folder' })),
                        react_2.default.createElement(react_1.Flex, null,
                            react_2.default.createElement(IconAndText_1.default, { icon: gr_1.GrScan, text: 'Scan for Duplicates', onClick: async () => {
                                    await window.electronAPI
                                        .walkFs()
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
            react_2.default.createElement(PageBody_1.PageBody, { left: '0%', top: '15%', height: '85%', borderBottom: 'solid 6px black', id: 'pgbody' },
                react_2.default.createElement(react_1.Flex, { width: '100%', height: '100%', display: 'flex' }, photos && photos?.length >= 0 && (react_2.default.createElement(react_1.Flex, { direction: 'row', width: '100%' },
                    react_2.default.createElement(react_1.Flex, { height: '100%', id: 'focusedImage', width: '70%', direction: 'column' },
                        react_2.default.createElement(react_1.Flex, { height: '80%', width: '100%', justifyContent: 'center' },
                            react_2.default.createElement(react_1.Image, { id: 'highestResImage', maxHeight: '100%', maxWidth: '100%', padding: '5', src: `data:image/jpg;base64,${focusedImage?.image}` })),
                        react_2.default.createElement(react_1.Flex, { height: '20%', border: 'solid 6px black', width: '100%', top: '80%', direction: 'row', align: 'center', justifyContent: 'space-evenly' },
                            react_2.default.createElement(react_1.Flex, { direction: 'column', width: '33.3%', align: 'center' },
                                react_2.default.createElement(react_1.Text, { fontSize: '30px' }, "Size "),
                                react_2.default.createElement(react_1.Text, { fontSize: '20px' }, Math.ceil(focusedImage?.stats?.size / 1024))),
                            react_2.default.createElement(react_1.Flex, { direction: 'column', width: '33.3%', align: 'center' },
                                react_2.default.createElement(react_1.Text, { fontSize: '30px' }, "Resolution "),
                                react_2.default.createElement(react_1.Text, { fontSize: '20px' },
                                    focusedImage?.stats?.width,
                                    " x",
                                    focusedImage?.stats?.height)),
                            react_2.default.createElement(react_1.Flex, { direction: 'column', width: '33.3%', align: 'center' },
                                react_2.default.createElement(react_1.Text, { fontSize: '30px' }, "Created at "),
                                react_2.default.createElement(react_1.Text, { fontSize: '20px' }, focusedImage?.stats?.birthtime?.toString())))),
                    react_2.default.createElement(react_1.Flex, { id: 'defocused-images', direction: 'column', width: '30%', height: '100%', borderLeft: 'solid 6px black', overflow: 'scroll' }, photos &&
                        photos?.map((photo, index) => {
                            return (react_2.default.createElement(react_1.Flex, { maxHeight: '33.33%', maxWidth: `100%`, border: `${photo?.value === focusedImage?.value
                                    ? 'solid 6px magenta'
                                    : 'solid 2px black'}`, direction: 'row' },
                                photo?.value ===
                                    sortPhotos?.highestResPhoto?.value && (react_2.default.createElement(react_1.Icon, { as: gr_1.GrAchievement, width: '50px', position: 'sticky', height: '50px', margin: '1' })),
                                photo?.value ===
                                    sortPhotos?.highestSizePhoto?.value && (react_2.default.createElement(react_1.Icon, { as: gr_1.GrContract, width: '50px', position: 'sticky', height: '50px', margin: '1' })),
                                react_2.default.createElement(react_1.Image, { id: `duplicate-photo-${index}`, width: '100%', height: '100%', objectFit: 'contain', padding: '5', onClick: () => {
                                        setFocusedImage(photo);
                                    }, ml: `${photo?.value ===
                                        sortPhotos?.highestResPhoto?.value
                                        ? photo?.value ===
                                            sortPhotos?.highestSizePhoto?.value
                                            ? -28
                                            : -14
                                        : photo?.value ===
                                            sortPhotos?.highestSizePhoto?.value
                                            ? -14
                                            : undefined}`, src: `data:image/jpg;base64,${photo?.image}` }),
                                react_2.default.createElement(react_1.Button, { as: gr_1.GrFormClose, width: '50px', position: 'sticky', height: '50px', margin: '1', ml: `${-12}`, zIndex: '3', onClick: () => setToBeDeleted([...toBeDeleted, ...photo?.value]) })));
                        })))))))));
};
exports.BasePage = BasePage;
//# sourceMappingURL=BasePage.js.map