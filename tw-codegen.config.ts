// tw-codegen.config.ts

const BREAKPOINTS: string[] = [
  '2kp','2k2p','2k3p','2k4p',
  'uhdp','uhd2p','uhd3p','uhd4p',
  '4kp','4k2p','4k3p','4k4p','4k5p','4k6p','4k7p','4k8p',
  '2uhd'
];

const CLASSES: string[] = [
    "p", "px", "py", "pt", "pl", "pr", "pb",
    "m", "mx", "my", "mt", "mr", "ml", "mb",
    "gap", "w", "h", "space-y", "space-x", "min-h", "max-h", "min-w", "min-w",
    "translate-x", "translate-y", "-translate-x", "-translate-y", "border",
    "right", "left"
]

const SIZES: number[] = [
    0.1, 0.125, 0.2, 0.25, 0.3, 0.4, 0.5, 0.6, 0.7, 0.75, 0.8, 0.9,
    1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10,
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100
]

export function s(_class: string, base_size: number, step: number = 0.125): string {
    function format(num: number) {
        return Number.isInteger(num) ? num : num.toFixed(1);
    }

    let classes = ` ${_class}-${format(base_size)} `

    for (let i = 0; i < BREAKPOINTS.length; i++) {
        classes += `${BREAKPOINTS[i]}:${_class}-${format(base_size * (1 + (i + 1) * step))} `
    }
    return classes;
}


export default function generateAll(): string {
  const chunks: string[] = [];

  // 👉 Ajoute ici tes cas d’usage

  for (const _class in CLASSES) {
    for (const size of SIZES) {
      chunks.push(s(CLASSES[_class], size));
    }
  }

  return chunks.join(' \\\n');
}
