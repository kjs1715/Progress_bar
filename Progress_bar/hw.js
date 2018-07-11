var count = new Array(0, 0, 0);

class ProgressBar 
{
    constructor(obj)
    {   
        if(obj.type == "ring")
        {
            count[0]++;
            this._type_num = count[0];
            this._type = obj.type + count[0];
        }
        else if(obj.type == "hourglass")
        {
            count[1]++;
            this._type_num = count[1];
            this._type = obj.type + count[1];
        }
        else if(obj.type == "bar")
        {
            count[2]++;
            this._type_num = count[2];
            this._type = obj.type
        }
        console.log(this._type);
        this._item = obj.container;
        this._background = obj.background;
        this._foreground = obj.foreground;
        this._complete = obj.complete;
        // this.width = 300;
        // this.height = 300;
        this._container = obj.container.split("#").join('');
        // console.log(this._container);

        let _new_html = "<canvas id=\'type_" + this._type + "\'" + "></canvas>";
        document.getElementById(this._container).innerHTML = _new_html;
        // console.log(_new_html);
    }

    draw_shape()
    {
        // console.log("fore-color:"+this._foreground);
        // console.log(this._type.slice(0, 4));
        if(this._type.slice(0, 4) == "ring")
        {
            let canvas = document.getElementById("type_"+this._type),
                        context = canvas.getContext('2d'),
                        rad = Math.PI*2/100;
            canvas.width = 300;
            canvas.height = 300;
            let centerX = canvas.width/2,
                centerY = canvas.height/2;
            // Draw background
            context.strokeStyle = this._background;
            context.lineWidth = 10;
            context.beginPath();
            context.arc(centerX, centerY, 50, 0, 360, false);
            context.stroke();
            context.closePath();

            // Draw foreground
            context.strokeStyle = this._foreground;
            context.lineWidth = 10;
            context.beginPath();
            context.arc(centerX, centerY, 50, -Math.PI/2, -Math.PI/2 + this._percent*rad, false);
            // console.log("centerX:"+centerX+", centerY:"+centerY+", width:"+canvas.width+", height:"+canvas.height);
            context.stroke();
            context.closePath();
            // console.log("stroking...");

            // Set percentage
            context.strokeStyle = "#000";
            context.font = "italic small-caps bold 20px arial";
            context.fillText(this._percent+'%', centerX-20, centerY+5, 50);
            console.log("drawed "+this._type);
        }
        else if(this._type.slice(0, 9) == "hourglass")
        {
            let canvas = document.getElementById("type_"+this._type),
            context = canvas.getContext('2d');
            canvas.width = 300;
            canvas.height = 300;

            
            // Draw triangle on the top
            context.beginPath()
            context.moveTo(0, 0);
            context.lineTo(canvas.width/2, 0);
            context.lineTo(canvas.width/4, canvas.height/2);
            context.closePath();
            context.fillStyle = this._background;
            context.fill();

            // Draw triangle on the bottom
            context.beginPath();
            context.moveTo(canvas.width/4, canvas.height/2);
            context.lineTo(0, canvas.height);
            context.lineTo(canvas.width/2, canvas.height);
            context.closePath();
            context.fillStyle = this._background;
            context.fill();

            // Draw new triangle(top)
            let pos_v = canvas.height/2 - this._percent * 1.5;
            let ratio = pos_v / (canvas.height/2);
            let pos_h = ratio * (canvas.width/4);
            // console.log(pos_h, pos_v, ratio);
            context.beginPath()
            context.moveTo(canvas.width/4 - pos_h, canvas.height/2 - pos_v);
            context.lineTo(canvas.width/4 + pos_h, canvas.height/2 - pos_v);
            context.lineTo(canvas.width/4, canvas.height/2);
            context.closePath();
            context.fillStyle = this._foreground;
            context.fill();

            // Draw new triangle(bottom)
            // pos_v = this._percent * 1.5;
            ratio = pos_v / (canvas.height/2);
            pos_h = ratio * (canvas.width/4);
            context.beginPath();
            context.moveTo(canvas.width/4 - pos_h , canvas.height/2 + pos_v);
            context.lineTo(0, canvas.height);
            context.lineTo(canvas.width/2, canvas.height);
            context.lineTo(canvas.width/4 + pos_h, canvas.height/2 + pos_v)
            context.closePath();
            context.fillStyle = this._foreground;
            context.fill();

            // Fill text
            context.fillStyle = "#000";
            context.font = "italic small-caps bold 20px arial";
            context.fillText(this._percent+'%', 60, 280);
            console.log("drawed "+this._type);
        }
        else if(this._type.slice(0, 3) == 'bar')
        {
            let canvas = document.getElementById("type_"+this._type),
            context = canvas.getContext('2d');
            canvas.width = 300;
            canvas.height = 300;

            // Draw background rectangle
            context.fillStyle = this._background;
            context.beginPath();
            context.moveTo(0, 0);
            context.lineTo(0, 30);
            context.lineTo(canvas.width/2, 30);
            context.lineTo(canvas.width/2, 0);
            context.closePath();
            context.fill();

            // Draw foreground rectangle
            context.fillStyle = this._foreground;
            context.beginPath();
            context.moveTo(0, 0);
            context.lineTo(0, 30);
            context.lineTo(this._percent*1.5, 30);
            context.lineTo(this._percent*1.5, 0);
            context.closePath();
            context.fill();

            // Fill the text
            context.fillStyle = "#000";
            context.font = "italic small-caps bold 20px arial";
            context.fillText(this._percent+'%', 60, 20);
            console.log("drawed "+this._type);
        }
    }

    set_progress(percent)
    {
        // console.log("start process...");
        this._percent = percent;
        
        // console.log(_new_html);
        // document.getElementById("progress-bar").innerHTML = new_html;
        if(this._percent >= 100)
            this._complete();
        this.draw_shape();

    }
}

