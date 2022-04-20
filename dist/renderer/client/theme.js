"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const material_1 = require("@mui/material");
const arcBlue = '#0B72B9';
const arcOrange = '#FFBA60';
exports.default = (0, material_1.createTheme)({
    typography: {
        h3: {
            fontWeight: 100,
        },
    },
    palette: {
        common: {},
        primary: {
            main: `${arcBlue}`,
        },
        secondary: {
            main: `${arcOrange}`,
        },
    },
});
//# sourceMappingURL=theme.js.map