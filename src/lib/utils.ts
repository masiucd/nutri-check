import {type ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function sleep(ms = 2000) {
	return new Promise((res) => setTimeout(res, ms));
}

export function validateFormData(
	data: FormData,
	fields: string[],
): Record<string, string | undefined> {
	let res: Record<string, string> = {};
	for (const field of fields) {
		const value = data.get(field);
		if (typeof value === "string") {
			res[field] = value;
		}
	}
	return res;
}

export function printErrorMessage(error: unknown) {
	if (error instanceof Error) {
		console.error(error.message);
	} else {
		console.error(error);
	}
}
