class RGBA {
    constructor(r = 0, g = 0, b = 0, a = 1) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }

    toString() {
        return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
    }

    subtract(rgba) {
        return new RGBA(
            Math.max(0, this.r - rgba.r),
            Math.max(0, this.g - rgba.g),
            Math.max(0, this.b - rgba.b),
            Math.max(0, this.a - rgba.a)
        );
    }

    add(rgba) {
        return new RGBA(
            Math.min(255, this.r + rgba.r),
            Math.min(255, this.g + rgba.g),
            Math.min(255, this.b + rgba.b),
            Math.min(1, this.a + rgba.a)
        );
    }

    static fromHex(hex) {
        if (hex.startsWith("#")) {
            hex = hex.slice(1);
        }
        if (hex.length === 3) {
            hex = hex.split("").map(c => c + c).join("");
        }
        if (hex.length !== 6) {
            throw new Error("Invalid hex color");
        }
        let r = parseInt(hex.slice(0, 2), 16);
        let g = parseInt(hex.slice(2, 4), 16);
        let b = parseInt(hex.slice(4, 6), 16);
        return new RGBA(r, g, b, 1);
    }
}

export { RGBA };