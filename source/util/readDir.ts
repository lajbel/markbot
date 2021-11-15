export async function readDir(dir: string, func: any) {
	for await (const file of Deno.readDir(dir)) {
		if (file.name.endsWith(".ts")) {
			func(file);
		}
	}
}
