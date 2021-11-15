{ pkgs }: {
	deps = [
		pkgs.deno
		pkgs.nodejs
		pkgs.nodePackages.prettier
	];
}