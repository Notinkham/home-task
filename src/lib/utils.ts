import type { BaseSyntheticEvent } from "react";

import { IMG_SIZES } from "./consts";
import type { Device } from "./types";

import fallbackImg from "../assets/fallback.png";

/**
 * Return first predefined image size from `IMG_SIZES` that is bigger than provided number.
 * Idea is to limit requesting images only to specific sizes so its more likely we request
 * an image same size as we already did and we can retrieve it from cache.
 */
export function getImageSize(size: number): number {
    const scaledSize = size * window.devicePixelRatio;
    return IMG_SIZES.find(imgSize => imgSize >= scaledSize) || size;
}

export function preventDefaultNoop(e: BaseSyntheticEvent): void {
    e.preventDefault();
}

export function setValueFactory(setValueFunc: (v: any) => unknown, value: any): () => void {
    return () => setValueFunc(value);
}

export function getImgSrc(deviceId: string, image: string, size: number) {
    return `https://images.svc.ui.com/?u=https%3A%2F%2Fstatic.ui.com%2Ffingerprint%2Fui%2Fimages%2F${deviceId}%2Fdefault%2F${image}.png&w=${size}&q=75`;
}

export function imgOnError(e: BaseSyntheticEvent): void {
    e.target.src = fallbackImg;
}

/* -------- Selectors -------- */
export function selectMaxPower(device: Device): number {
    const maxPower = Object.values(device.unifi?.network?.radios || {}).map(item => item.maxPower || 0);
    if (maxPower.length) {
        return Math.max(...maxPower);
    }
    return 0;
}

export function selectSpeed(device: Device): number {
    const speed = Object.values(device.unifi?.network?.radios || {}).map(item => item.maxSpeedMegabitsPerSecond || 0);
    if (speed.length) {
        return Math.max(...speed);
    }
    return 0;
}

export function selectNumberOfPorts(device: Device): number {
    return device.unifi?.network?.numberOfPorts || 0;
}
