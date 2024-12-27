const NODE_UTF16MAX = 1<<27-1;

export class StringBuilder{
    buffer = Buffer.allocUnsafe(10000*5/*512*/);
    length = 0;
    static decoder = new TextDecoder("utf-16le");
    reserve(size){
        this.length += size;
        let buffSize = this.buffer.byteLength;
        if(this.length <= buffSize)
            return;
        while(buffSize < this.length){
            buffSize *= 2;
        }
        const buffer1 = Buffer.allocUnsafe(buffSize);
        this.buffer.copy(buffer1,0);
        this.buffer = buffer1;
    }
    append(str){
        const len0 = this.length;
        //this.reserve(str.length);
        this.buffer.write(str,len0,str.length,"utf16le");
    }
    toString(){
        return this.buffer.toString()
        // const decoder = this.constructor.decoder;
        // const len = this.length;
        // if(len < NODE_UTF16MAX){
        //     return decoder.decode(this.u16.subarray(0,this.length));
        // }
        // let res = "";
        // let pos = 0;
        // while(len - pos > NODE_UTF16MAX){
        //     res += decoder.decode(this.u16.subarray(pos,pos+NODE_UTF16MAX));
        //     pos += NODE_UTF16MAX;
        // }
        // res += decoder.decode(this.u16.subarray(pos,len));
        // return res;
    }
}
