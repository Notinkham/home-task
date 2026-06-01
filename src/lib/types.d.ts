export type DeviceListStyle = "table" | "grid";

export type DeviceDetailsStyle = "text" | "json";

export type DeviceSpecsTuple = [string, (d: Device) => number, string, string];

export type LineFilter = Record<string, LineFilterData>;

export interface LineFilterData extends Line {
    checked: boolean;
}

export interface Data {
    devices: Device[];
    version: string;
}

interface Device {
    deviceType: string;
    deviceTypes: string[];
    guids: string[];
    icon: Icon;
    id: string;
    images: Images;
    line: Line;
    product: Product;
    shortnames: string[];
    sku: string;
    sysid?: string;
    sysids: string[];
    triplets: Triplet[];
    uisp?: Uisp;
    videos: Videos;
    btle?: Btle;
    jrf?: string[];
    jpa?: string[];
    compliance?: Compliance;
    minAdoptVersion?: MinAdoptVersion;
    unifi?: Unifi;
    isARSupported?: boolean;
    fcc?: string;
    ic?: string;
    power?: DevicePower;
}

interface DevicePower {
    baseConsumption: number;
}

interface Unifi {
    adoptability?: string;
    network?: Network;
    protect?: Protect;
}

interface Protect {
    fov: number;
    suggestedDistance: number;
}

interface Network {
    bleServices?: NetworkBleService[];
    deviceCapabilities: string[];
    formFactor?: string[];
    model: string;
    radios: Radios;
    type: string;
    chipset?: string;
    ethernetMaxSpeedMegabitsPerSecond?: number;
    features?: NetworkFeatures;
    minimumFirmwareRequired?: null | string;
    numberOfPorts?: number;
    systemIdHexadecimal?: string;
    diagram?: string[];
    ports?: Ports;
    details?: Details;
    ipsLimits?: IpsLimits;
    knownUnsupportedFeatures?: string[];
    linkNegotiation?: LinkNegotiation;
    mdnsLimits?: Full;
    networkGroups?: EthNetworks;
    shadowMode?: ShadowMode;
    subtypes?: string[];
    hybrid?: string;
    switchPorts?: number[];
    optionalWanPortIndexes?: number[];
    power?: NetworkPower;
    outlets?: Outlets;
    outletsDiagram?: string[];
    primaryOutletGroupCount?: number;
    primaryPortGroupCount?: number;
    outletsDiagramMobile?: string[];
    temperatureSensors?: TemperatureSensor[];
    rps?: Rps;
    optionalWanPortNumbers?: number[];
}

interface Rps {
    diagram: string[];
    primaryPortGroupCount: number;
}

interface TemperatureSensor {
    maxTemp?: number;
    sensor: string;
}

interface Outlets {
    lan?: number[];
    meta?: OutletMeta;
    rj45?: number[];
    standard: number[] | number | string;
    surge?: number[];
    usb?: number[] | string;
    wan?: number[];
}

type OutletMeta = Record<string, OutletMetaData>;

interface OutletMetaData {
    center?: boolean;
    marginLeft?: string;
    portIdx?: number;
    tooltipPlacement?: string;
    rotation?: string;
    surgeType?: string;
    vertical?: boolean;
    nonClickable?: boolean;
}

interface NetworkPower {
    capacity: number;
}

interface ShadowMode {
    interconnectPortInterface: string;
    interconnectPortNumber: number;
}

type EthId = `eth${number}`;

type NetworkType = "LAN" | "WAN" | "WAN2";

type EthNetworks = Record<EthId, string>;

type LinkNegotiation = Record<EthId, EthLinkNegotiation>;

interface EthLinkNegotiation {
    portIdx?: number;
    supportedValues?: string[];
    bindWith?: string;
}

interface IpsLimits {
    etOptionsLimits: EtOptionsLimits;
    memoryWarningPercentage?: number;
}

interface EtOptionsLimits {
    full?: Full;
    open: Full;
    performance: Full;
}

interface Full {
    hard: number;
    soft: number;
}

interface Details {
    ipsThroughput: string;
    legacyPortRemap?: boolean;
}

interface Ports extends EthNetworks {
    plus?: number[] | number | string;
    sfp28?: number[] | string;
    standard?: number[] | number | string;
    hdmi?: number[];
    meta?: PortMeta;
    xlr?: number[];
    qsfp28?: string;
    rj45?: number[];
    sfp?: number[];
    usbc?: number[];
    wan?: number[];
}

type PortMeta = Record<string, PortMetaData>;

interface PortMetaData {
    combo?: string[];
    uplinkPort?: boolean;
    direction?: string;
    rotation?: string;
}

interface NetworkFeatures {
    atfDisabled?: boolean;
    ax?: boolean;
    bandsteer?: boolean;
    be?: boolean;
    gen?: number;
    outdoorModeSupport?: boolean;
    poe?: boolean;
    zh?: boolean;
    ac?: boolean;
    brcm?: boolean;
    airTime?: boolean;
    airView?: boolean;
    dfs?: boolean;
    fan?: string;
    legacyPortRemap?: boolean;
    sfpPlusSupported?: boolean;
    uplinkPort?: number;
}

type Radios = Record<string, RadioData>;

interface RadioData {
    gain?: number;
    maxPower?: number;
    maxSpeedMegabitsPerSecond?: number;
}

interface NetworkBleService {
    configured: string;
    default: string;
    features?: BleServiceFeatures;
}

interface BleServiceFeatures {
    ucore: boolean;
}

interface MinAdoptVersion {
    net?: string;
    protect?: string;
}

interface Compliance {
    fcc?: string;
    ic?: string;
    icEmi?: string;
    modelName: string;
    rcm?: boolean;
    rfCmFcc?: number;
    rfCmIc?: number;
    text: Text;
    anatel?: string;
    jrf?: string[];
    ncc?: string;
    indoorOnly?: boolean;
    jpa?: string[];
    productName?: string;
    cn?: string;
    wifi?: string;
    kc?: string;
    jnfc?: string;
}

interface Text {
    CA: string[];
    US: string[];
    BR?: string[];
    Br?: string[];
}

interface Btle {
    factoryDefault: string;
    userConfigured: string;
}

interface Videos {
    'mobile-intro'?: string;
    'mobile-setup-wizard-plugin'?: string;
    'mobile-setup-wizard-testing-connection'?: string;
}

interface Uisp {
    bleServices: BleServices;
    firmware: Firmware;
    line: string;
    nameLegacy: string[];
}

interface Firmware {
    board: string[];
    platform: null | string;
}

type UispBleServices = Record<string, BleServiceMode>;

interface BleServiceMode {
    mode: string;
}

interface Triplet {
    k1?: string;
    k2?: string;
    k3?: string;
}

interface Product {
    abbrev: string;
    name: string;
}

interface Line {
    id: string;
    name: string;
}

interface Images {
    default: string;
    nopadding: string;
    topology: string;
    rack?: string;
    blueprint?: string;
    'blueprint-dark'?: string;
    'mobile-connection'?: string;
    'mobile-internet-connected'?: string;
    'mobile-no-internet'?: string;
    'left-nopadding'?: string;
    'right-nopadding'?: string;
}

interface Icon {
    id: string;
    resolutions: number[][];
}