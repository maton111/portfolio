export type BootTask = {
    id: string
    label: string
    weight: number
    minMs: number
    maxMs: number
    logTemplate: string
}

export const bootTasks: BootTask[] = [
    {
        id: 'core',
        label: 'Bootstrapping core modules',
        weight: 14,
        minMs: 260,
        maxMs: 460,
        logTemplate: 'CORE_MODULE_LOADED // ID: {hex}',
    },
    {
        id: 'cipher',
        label: 'Applying identity cipher',
        weight: 11,
        minMs: 220,
        maxMs: 420,
        logTemplate: 'IDENTITY_CIPHER_READY // RSA_4096:{hex}',
    },
    {
        id: 'ui',
        label: 'Hydrating HUD renderer',
        weight: 15,
        minMs: 260,
        maxMs: 500,
        logTemplate: 'HUD_RENDER_PIPELINE_SYNCED // FRAME:{hex}',
    },
    {
        id: 'assets',
        label: 'Loading visual assets',
        weight: 19,
        minMs: 320,
        maxMs: 680,
        logTemplate: 'ASSET_MATRIX_ATTACHED // CHUNK:{hex}',
    },
    {
        id: 'network',
        label: 'Verifying network channels',
        weight: 13,
        minMs: 240,
        maxMs: 480,
        logTemplate: 'NETWORK_HANDSHAKE_STABLE // LATENCY:{ms}ms',
    },
    {
        id: 'integrity',
        label: 'Running integrity checks',
        weight: 16,
        minMs: 300,
        maxMs: 520,
        logTemplate: 'INTEGRITY_SCAN_COMPLETE // HASH:{hex}',
    },
    {
        id: 'finalize',
        label: 'Finalizing startup sequence',
        weight: 12,
        minMs: 180,
        maxMs: 340,
        logTemplate: 'SYSTEM_STATE_COMMITTED // READY:{hex}',
    },
]

export const BOOT_STORAGE_KEY = 'portfolio.boot-seen.v1'
