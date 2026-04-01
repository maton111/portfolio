export type HeroStat = {
    label: string
    value: number
    colorClass: string
}

export type HeroQuest = {
    icon: string
    text: string
}

export const heroContent = {
    availability: 'Available for work',
    eyebrow: 'Builder mindset · backend first · full stack direction',
    title: 'Ciao, sono Mattia.',
    subtitle: 'Creo, imparo e continuo a crescere.',
    intro:
        'Sono uno sviluppatore backend con una forte spinta verso il full stack. Mi piacciono i sistemi ben pensati, l\'estetica fatta bene, e tutto ciò che mi fa salire di livello.',
    ctas: {
        primary: 'Entra nel mio mondo',
        secondary: 'Scrivimi',
    },
    trust: '.NET / React / Flutter / Based in Italy',
    hud: {
        name: 'Mattia Archinà',
        role: 'Builder Dev',
        level: 'LVL 26',
        status: 'Leveling up',
        stats: [
            {label: 'Backend_Stability', value: 93, colorClass: 'is-green'},
            {label: 'Frontend_Polish', value: 67, colorClass: 'is-mint'},
            {label: 'Discipline_Stat', value: 82, colorClass: 'is-soft'},
            {label: 'Curiosity_Engine', value: 98, colorClass: 'is-orange'},
        ] as HeroStat[],
        quests: [
            {icon: 'rocket_launch', text: 'Current build: Everyday Life Core'},
            {icon: 'task_alt', text: 'Main quest: Becoming full stack'},
        ] as HeroQuest[],
        tags: ['One Piece fan', 'Gym mindset', 'Builder mode'],
    },
    scannerItems: [
        {icon: 'radar', text: 'Current Status: Available for Hire', highlighted: true},
        {icon: 'memory', text: 'System Load: Thinking', highlighted: false},
        {icon: 'hub', text: 'Network: Stable', highlighted: true},
        {icon: 'bolt', text: 'Energy: Optimized', highlighted: false},
    ],
}
