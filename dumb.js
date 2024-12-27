const NODE_UTF16MAX = 1<<27-1;

// export class StringBuilder{
//     buffer = Buffer.allocUnsafe(10000*5/*512*/);
//     length = 0;
//     append(str){
//         this.buffer.write(str,this.length,str.length,"utf16le");
//         this.length += str.length;
//     }
//     toString(){
//         return this.buffer.toString("utf16le",0,this.length)
//     }
// }

export class StringBuilder{
    str = "";
    append(str){
        this.str += str;
    }
    toString(){
        return this.str;
    }
}
