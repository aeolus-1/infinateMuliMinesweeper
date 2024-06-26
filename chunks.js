


function chunkArray2d(e, t, n = {}, r = v(1, 1), c) {
    let a = new Array(e);
    for (let e = 0; e < a.length; e++) {
        a[e] = new Array(t);
        for (let t = 0; t < a[e].length; t++)
            a[e][t] = new cChunk(v(e * r.x, t * r.y), c);
    }
    return { array: a, data: n };
}
function tileArray2d(e, t, n, r, c) {

    let a = new Array(e);
    for (let e = 0; e < a.length; e++) {
        a[e] = new Array(t);
        for (let t = 0; t < a[e].length; t++)
            a[e][t] = new cTile(
                n * 1 + e * (1 / c.options.rows),
                r * 1 + t * (1 / c.options.columns)
            );
    }
    return a;
}


function cTile(e, t) {
    this.pos = v(e, t)
    var dst = getDst(v(0,0),v(e,t))*0.5,
        num = Math.abs(Math.sin(dst))*0.10
    this.mine = Math.random()<((0.05+num))*0.8
    this.uncovered = 1
    this.flagged = false
    this.lootBox = this.mine?false:Math.random()<(1/65)
    this.flaggedBy = null
    this.loaded = true
    this.count = 0
}
function cChunk(e, t) {

    (this.mobiles = new Array()),
        (this.furnitureMobiles = new Array()),
        (this.grid = tileArray2d(t.options.rows, t.options.columns, e.x, e.y, t)),
        (this.pos = e);
}
;
let startingSize = 20;

class Chunks {
    constructor(options) {
        this.options = {
            rows: 5,
            columns: 5,
            width: 10,
            height: 10,
            xSet: randInt(-1e6, 1e6),
            ySet: randInt(-1e6, 1e6),
            ...options,
        }

        this.chunkMaps = {
            x1y1array: chunkArray2d(startingSize, startingSize, "x1y1", v(1, 1), this),
            x0y1array: chunkArray2d(startingSize, startingSize, "x0y1", v(-1, 1), this),
            x1y0array: chunkArray2d(startingSize, startingSize, "x1y0", v(1, -1), this),
            x0y0array: chunkArray2d(startingSize, startingSize, "x0y0", v(-1, -1), this),
        }
    }
    requestChunk(e, t) {
        let n = e < 0 ? (t < 0 ? "x0y0" : "x0y1") : t < 0 ? "x1y0" : "x1y1",
            r = this.chunkMaps[n + "array"].array;
        let a = e < 0 ? -1 * e : e,
            l = t < 0 ? -1 * t : t;
        return (
            r.length - 1 < a &&
            ((r[a] = new Array()), (r[a][l] = new cChunk(v(e, t), this))),
            null == r[a] && (r[a] = new Array()),
            r[a].length - 1 < l && (r[a][l] = new cChunk(v(e, t), this)),
            null == r[a][l] && (r[a][l] = new cChunk(v(e, t), this)),
            r[a][l]
        );
    }
    requestTile(e, t) {
        let n = v(Math.floor(e / this.options.rows), Math.floor(t / this.options.columns)),
            tileP = v(e - n.x * this.options.rows, t - n.y * this.options.columns)
        return (
            
            this.requestChunk(n.x, n.y).grid[tileP.x][tileP.y]
        );
    }
    requestChunks(e, t, n, r) {
        let a = new Array();
        for (let l = n; l > 0; l--)
            for (let n = 0; n < r; n++) {console.log(n, t);a.push(this.requestChunk(l + e, n + t));}
        return a;
    }
    getMobiles(e) {
        let t = new Array(),
            n = new Array();
        for (let r = 0; r < e.length; r++) {
            const a = e[r];
            for (let e = 0; e < a.mobiles.length; e++) {
                const n = a.mobiles[e];
                t.push(n);
            }
            for (let e = 0; e < a.furnitureMobiles.length; e++) {
                const t = a.furnitureMobiles[e];
                n.push(t);
            }
        }
        return { mobs: t, furnitureMobs: n };
    }
    removeMob(e, t, n) {
        let r = this.requestChunk(e, t);
        for (let e = 0; e < r.mobiles.length; e++) {
            if (r.mobiles[e].id == n) {
                r.mobiles.splice(e, 1);
                break;
            }
        }
    }
    insertMob(e, t, n) {
        let r = this.requestChunk(e, t);
        return this.removeMob(e, t, n.id), r.mobiles.push(n), n;
    }
};
