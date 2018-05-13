import dayjs from "dayjs";

export const format = date => dayjs(date).format("YYYY MMM DD HH:mm");
