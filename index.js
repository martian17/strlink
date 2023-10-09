const NODE_UTF16MAX = 1<<27-1;

export class StringBuilder{
    u16 = new Uint16Array(512);
    length = 0;
    position = 0;
    static decoder = new TextDecoder("utf-16le");
    reserve(end){
        if(end <= this.u16.length){
            if(end > this.length){
                this.length = end;
            }
            return;
        }
        let len = this.u16.length;
        while(len < this.length){
            len *= 2;
        }
        const u16n = new Uint16Array(len);
        u16n.set(this.u16);
        this.u16 = u16n;
        this.length = end;
    }
    reserveEnd(strlen){
        this.length += strlen;
        if(this.length <= this.u16.length)
            return;
        let len = this.u16.length;
        while(len < this.length){
            len *= 2;
        }
        const u16n = new Uint16Array(len);
        u16n.set(this.u16);
        this.u16 = u16n;
    }
    append(str){
        this.reserveEnd(str.length);
        let position = this.position;
        for(let i = 0; i < str.length; i++){
            this.u16[position++] = str.charCodeAt(i);
        }
        this.position = position;
    }
    toString(){
        const decoder = this.constructor.decoder;
        const len = this.length;
        if(len < NODE_UTF16MAX){
            return decoder.decode(this.u16.subarray(0,this.length));
        }
        let res = "";
        let pos = 0;
        while(len - pos > NODE_UTF16MAX){
            res += decoder.decode(this.u16.subarray(pos,pos+NODE_UTF16MAX));
            pos += NODE_UTF16MAX;
        }
        res += decoder.decode(this.u16.subarray(pos,len));
        return res;
    }
}
