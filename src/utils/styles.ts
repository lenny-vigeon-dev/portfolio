import "$/app.css";

export function s(_class: string, base_size: number, step: number = 0.125): string {
    function format(num: number) {
        return Number.isInteger(num) ? num : num.toFixed(1);
    }
    const sizes: string[] = [
        "2kp",
        "2k2p",
        "2k3p",
        "2k4p",

        "uhdp",
        "uhd2p",
        "uhd3p",
        "uhd4p",

        "4kp",
        "4k2p",
        "4k3p",
        "4k4p",
        "4k5p",
        "4k6p",
        "4k7p",
        "4k8p",

        "2uhd"
    ];
    let classes = ` ${_class}-${format(base_size)} `

    for (let i = 0; i < sizes.length; i++) {
        classes += `${sizes[i]}:${_class}-${format(base_size * (1 + (i + 1) * step))} `
    }
    // console.log(classes);
    return classes;
}



export const primary_gradient = " bg-gradient-to-r from-red-500 to-orange-500 dark:bg-gradient-to-r dark:from-blue-500 dark:to-purple-500 ";
export const colored_title = " bg-clip-text text-transparent mb-6 font-bold " + primary_gradient;
export const gradient_div_parent = " flex group " + primary_gradient;
export const gradient_div_child = " flex-3 inline-flex items-center \
        m-0.25 2kp:m-0.5 2uhd:m-0.75 \
        hover:bg-transparent group-focus-within:bg-transparent \
        bg-lbg2 dark:bg-dbg2 active:bg-lbg2/30 dark:active:bg-dbg2/30 \
        dark:hover:text-dt2 hover:text-lt2 \
        group-focus-within:dark:text-dt2 group-focus-within:text-lt2 \
        text-lcol2 dark:text-dcol3 \
        transition-all duration-300 ";

export const animated = " animate-in duration-100 transition-all ease-in-out ";
export const h1_sizes = " text-3xl sm:text-4xl md:text-5xl lg:text-6xl fhdp:text-7xl 2kp:text-8xl uhdp:text-9xl 4kp:text-10xl font-bold leading-snug " + animated;
export const h2_sizes = " text-2xl sm:text-3xl md:text-4xl lg:text-5xl fhdp:text-6xl 2kp:text-7xl uhdp:text-8xl 4kp:text-9xl font-bold leading-snug " + animated;
export const h3_sizes = " text-2xl md:text-3xl fhdp:text-4xl 2kp:text-5xl uhdp:text-6xl 4kp:text-7xl 2uhd:text-9xl font-bold leading-snug " + animated;
export const h3_sizes_lg = " text-lg md:text-lg fhdp:text-2xl 2kp:text-3xl uhdp:text-4xl 4kp:text-5xl 2uhd:text-7xl font-bold leading-snug " + animated;
export const h4_sizes = " text-xl md:text-2xl fhdp:text-3xl 2kp:text-4xl uhdp:text-5xl 4kp:text-6xl 2uhd:text-8xl font-bold leading-snug " + animated;
export const text_xs = " text-xs 2kp:text-lg uhdp:text-2xl 4kp:text-3xl 2uhd:text-4xl " + animated;
export const text_sm = " text-sm 2kp:text-xl uhdp:text-3xl 4kp:text-4xl 2uhd:text-5xl " + animated;
export const p_font_sizes_l = " text-lg md:text-2xl fhdp:text-3xl 2kp:text-4xl uhdp:text-6xl 4kp:text-7xl 2uhd:text-8xl uhdp:leading-snug " + animated;
export const p_font_sizes_m = " text-lg md:text-xl fhdp:text-2xl 2kp:text-3xl uhdp:text-5xl 4kp:text-6xl 2uhd:text-8xl uhdp:leading-snug " + animated;
export const p_font_sizes_s = " text-xs 2kp:text-2xl uhdp:text-3xl 4kp:text-4xl 2uhd:text-6xl " + animated;
export const p_width = " max-w-3xl 2kp:max-w-full " + animated;
export const p_width2 = " max-w-6xl 2kp:max-w-[60%] " + animated;
export const svg_scale = " scale-100 2kp:scale-150 uhdp:scale-200 4kp:scale-250 2uhd:scale-300 " + animated;

export const rounded_md = " rounded-md 2kp:rounded-lg uhdp:rounded-xl 4kp:rounded-2xl 2uhd:rounded-3xl ";
export const rounded_lg = " rounded-lg 2kp:rounded-xl uhdp:rounded-2xl 4kp:rounded-3xl 2uhd:rounded-4xl ";
export const rounded_2xl = " rounded-2xl 2kp:rounded-3xl uhdp:rounded-4xl 4kp:rounded-5xl 2uhd:rounded-6xl ";
