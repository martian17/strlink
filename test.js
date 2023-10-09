import { StringBuilder } from "./index.js";

const test = function(limit){
    const t1 = performance.now();
    let res1 = "";
    for(let i = 0; i < limit; i++){
        res1 += (i+"");
    }
    const t2 = performance.now();
    console.log(`+= ${t2-t1} ${res1[res1.length-1]}`);
    const t3 = performance.now();
    let sb = new StringBuilder;
    for(let i = 0; i < limit; i++){
        sb.append(i+"");
    }
    const res2 = sb.toString();
    const t4 = performance.now();
    console.log(`sb ${t4-t3} ${res2[res2.length-1]}`);
}

test(10);


