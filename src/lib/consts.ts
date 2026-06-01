import type { DeviceSpecsTuple } from "./types";
import { selectMaxPower, selectNumberOfPorts, selectSpeed } from "./utils";

export const FETCH_URL = "https://static.ui.com/fingerprint/ui/public.json";

/**
 * Hard coded values based on sizes returned when requesting images. 
 * Full list of values up to 1920 are 16 24 32 48 64 96 128 192 256 384 512 640 750 1024 1200 1920
 * I removed ones that I considered to have least visual impact, for example, from 16 to 24
 * With less values its more likely `getImageSize()` will return the same size that is already cached.
 */
export const IMG_SIZES = [
    24,
    48,
    96,
    128,
    192,
    256,
    384,
    512,
    640,
    750,
    1024,
    1200,
    1920,
];

// Image sizes in design relative to the 1440px width examples
export const TABLE_IMG_SIZE = 20; // Table device list
export const GRID_IMG_SIZE = 84; // Grid device list
export const DETAILS_IMG_SIZE = 292; // Device details

/**
 * How many devices should be shown on initial load and on show more button press.
 * These number should divide with 6 and 2 without remainder as we want to display
 * device list grid with full rows on different screen sizes.
 */
export const INIT_DEVICE_COUNT = 60;
export const SHOW_MORE_DEVICE_COUNT = 60;

export const SEARCH_DEBOUNCE_TIME = 200;

export const LINE_FILTER_SEPARATOR = ";";

/**
 * List of device specs to show if data is available.
 * Each row contains
 * 
 * [Specification name, Value selector function, Prefix, Postfix]
 */
export const DEVICE_SPECS_LIST: DeviceSpecsTuple[] = [
    ["Max. Power", selectMaxPower, "", "W"],
    ["Speed", selectSpeed, "", "Mbps"],
    ["Number of Ports", selectNumberOfPorts, "", ""],
];