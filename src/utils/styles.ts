import "$/app.css"

export const lcol1 = "from-red-600"
export const lcol2 = "to-orange-600"
export const dcol1 = "from-blue-600"
export const dcol2 = "to-purple-600"
export const space_lcol1 = " " + lcol1 + " "
export const space_lcol2 = " " + lcol2 + " "
export const space_dcol1 = " " + dcol1 + " "
export const space_dcol2 = " " + dcol2 + " "
export const primary_gradient = " bg-gradient-to-r"+ space_lcol1 + space_lcol2 +
    " dark:" + dcol1 + " dark:" + dcol2 + " ";
export const primary_gradient_border = " border-transparent " + primary_gradient;
export const colored_title = " bg-clip-text text-transparent mb-6 font-bold " + primary_gradient;
export const animated500 = " animate-in slide-in-from-bottom-4 duration-500 ";
export const h1_sizes = "text-3xl sm:text-4xl md:text-5xl lg:text-6xl fhdp:text-7xl 2kp:text-8xl uhdp:text-9xl text-muted-foreground font-bold leading-snug";
export const p_font_sizes = " text-lg md:text-2xl fhdp:text-3xl 2kp:text-4xl uhdp:text-5xl text-muted-foreground ";
export const p_width = " max-w-2xl 2kp:max-w-3xl uhdp:max-w-7xl ";
