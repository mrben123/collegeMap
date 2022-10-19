    class Q{
        constructor(picUrl,x, y) {
            this.url = picUrl
            this.x = x;
            this.y = y;
        }
        draw(){
            //pass
        }
    }

    let flagStatus = false
    function _init(){
        declare_app()
        _init_event()
    }

    function declare_app(){
        let app = new PIXI.Application({ width: 1000, height: 767 ,forceCanvas:true});
        let app_container = document.getElementById('canvas')

        let flag = PIXI.Sprite.from('./images/redFlag.png');
        flag.width = 10;
        flag.height = 10;
        app_container.appendChild(app.view);

        add_canvas_listener(app,app_container,flag)
        draw_map(app)

    }

    function set_flag(app,sprite,position){
        sprite.position.set(position.x, position.y);
        app.stage.addChild(sprite);
    }

    function draw_map (app){
        let sprite = PIXI.Sprite.from('./images/221018.jpg');
        sprite.width = 1000;
        sprite.height = 767;
        app.stage.addChild(sprite);
    }
    function add_canvas_listener(app,container,sprite){
        let square = new PIXI.Graphics();
        square.beginFill(0x000);
        square.drawRect(0, 0, 1000, 800);
        square.endFill();
        square.interactive = true;
        app.stage.addChild(square);

        square.on('mousedown', function (e) {
            flagStatus = true
            position.x = Math.round(e.data.global.x)
            position.y =  Math.round(e.data.global.y)
            // draw_img()
            show_table(position)
            set_flag(app,sprite,position)
            draw_img()
        });
        square.on('mousemove', function (e) {

            if(!status){
                position.x = e.data.global.x
                position.y =  e.data.global.y
                draw_img()
            }
        });
    }

    const sub_app = document.getElementById('sub_canvas').getContext("2d");

    let status = false
    document.addEventListener('keypress',function (e){
        console.log(e.code)
        if(e.code == 'Space'){
            status = !status
            if(status){
                console.log('停止绘画')
            }else {
                console.log('开启绘画')
            }}
    })

    const draw_img = function (){
        let image = new Image();
        image.crossOrigin = 'anonymous';
        image.src = './images/221018.jpg';
        image.currentTime = 1;
        image.onload = function (){

            sub_app.drawImage(this,position.x*3-150,position.y*3-75,300,230,0,0,300,230)
            draw_point()
        }
    }
    function _init_event(){
        $("#query").click(function (){
            queryName($('#input').val())
        })
    }


    const draw_point = function (){

        sub_app.beginPath()
        sub_app.moveTo(140, 80);
        sub_app.lineTo(160, 80);
        sub_app.closePath()
        sub_app.lineWidth = 1;
        sub_app.strokeStyle = "#E71929";
        sub_app.stroke();

        sub_app.beginPath()
        sub_app.moveTo(150, 70);
        sub_app.lineTo(150, 90);
        sub_app.closePath()
        sub_app.lineWidth = 1;
        sub_app.strokeStyle = "#E71929";
        sub_app.stroke();

    }

    const show_table = function (p){
        judgePosition(p)
    }
    const judgePosition = function (p){
        let a_x,a_y,b_x,b_y

        console.log('当前x坐标',p.x)
        console.log('当前y坐标',p.y)
        _positions.forEach((item,index)=>{
            if(item.length == 4){
                a_x = item[0]
                a_y = item[1]
                b_x = item[2]
                b_y = item[3]

                if(p.x>a_x && p.x< b_x && p.y>a_y && p.y<b_y){
                    // console.log('h'+index+'的范围坐标为： ')
                    // console.log(a_x,a_y,b_x,b_y)
                    let key = 'h'+ Number(index+1)
                    // console.log(key)
                    // console.log(_info[key])
                    insertData(_info[key])
                    addTitle(_info[key],key)
                }
            }
            if(item.length == 8){
                a_x = item[0]
                a_y = item[1]
                b_x = item[4]
                b_y = item[5]

                if(p.x>a_x && p.x< b_x && p.y>a_y && p.y<b_y){
                    // console.log('h'+index+'的范围坐标为： ')
                    // console.log(a_x,a_y,b_x,b_y)
                    let key = 'h'+ Number(index+1)
                    // console.log(key)
                    // console.log(_info[key])
                    insertData(_info[key])
                    addTitle(_info[key],key)
                }
            }
        })
    }
    const insertData = function (obj){
        $('#name').text(obj.name)
        $('#region').text(obj.region)
        $('#main_fun').text(obj.main_fun)
        $('#area').text(obj.area)
    }

    const queryName = function (query){
        let search = $.trim(query)
        if(!search){
            return
        }
        console.log(search)
        Object.keys(_info).forEach((key)=>{
            if(_info[key].name == $.trim(query) || _info[key].name.indexOf( $.trim(query)) != -1){
                insertData(_info[key])
                addTitle(_info[key],key)
            }
        })
    }

    const formatObjToArr = function (obj){
        let _arr = []
        obj.forEach((item)=>{
            let t =Object.keys(item)
            let a = []
            t.forEach((b)=>{
                a.push(item[b])
            })
            _arr.push(a)
        })
        return _arr
    }
    const getColumnSum = function (arr){
        let res = []
        let i = 0
        if(arr.length == 0){
            return
        }
        arr.forEach((item,j)=>{
            item.forEach((a,b)=>{
                if(j == 0){
                    res.push(a)
                }else {
                    res[b] = Number(res[b]+Number(a))
                }
            })
        })
        return res

    }
    const addArray = function (a,b){
        let arr = []
        let c
        a.forEach((item,i)=>{
            c = Number(a[i]) + Number(b[i])
            arr.push(c)
        })
        return arr
    }
    const insertBuildingInfo = function (obj){
        //添加表格内容
        let git = formatObjToArr(obj.building)
        let _git = obj.building_extend?formatObjToArr(obj.building_extend):''
        let sum = getColumnSum(git)
        let _sum = getColumnSum(_git)
        let _str = ''
        let _sumStr = ''
        let concat_sum

        if(_git){
            _git.forEach((item,i)=>{
                _str = '<th scope="row">'+'-'+Number(i+1)+'层</th>'
                item.forEach((a,j)=>{
                    _str = _str + '<td>'+ a+ '</td>'
                })
                _str = '<tr>' + _str +'</tr>'
                $('#tbody2').append(_str)

            })
        }
        if(git.length>0){
            //负楼层

            //自然楼层
            git.forEach((item,i)=>{
                _str = '<th scope="row">'+Number(i+1)+'层</th>'
                item.forEach((a,j)=>{
                    _str = _str + '<td>'+ a+ '</td>'
                })
                _str = '<tr>' + _str +'</tr>'
                $('#tbody2').append(_str)

            })
            //添加总和
            if(!_git){
                _sumStr = '<th scope="row">Sum</th>'
                sum.forEach((item,i)=>{
                    _sumStr = _sumStr + '<td>'+ Number(item).toFixed(2)+ '</td>'
                })
                _sumStr = '<tr>' + _sumStr +'</tr>'
                $('#tbody2').append(_sumStr)
            }else {
                concat_sum = addArray(sum,_sum)
                _sumStr = '<th scope="row">Sum</th>'
                concat_sum.forEach((item,i)=>{
                    _sumStr = _sumStr + '<td>'+ Number(item).toFixed(2)+ '</td>'
                })
                _sumStr = '<tr>' + _sumStr +'</tr>'
                $('#tbody2').append(_sumStr)
            }


        }else {
            //加一条都为空的数据
            _str = '<h3>暂无数据</h3>'
            $('#tbody2').append(_str)
        }


    }
    const addTitle = function (obj,key){
        console.warn(key)
        if(!obj){return}
        let white_list = ['h34','h35','h36']
        let white_status = white_list.includes(key)

        /*清空子元素*/
        $('#tbody1').empty()
        $('#tbody2').empty()

        if(!white_status){
            let arr = obj.main_fun.split('、')
            arr.forEach((col,i)=>{
                if(i == 0){
                    //添加表头
                    let th_lef_top = '<th scope="col">楼层</th>'
                    $('#tbody1').append(th_lef_top)
                }
                let temp1 = '<th scope="col">' + col + '</th>'
                $('#tbody1').append(temp1)
            })
            insertBuildingInfo(obj,arr)
        }else {
            let table_head = '<th scope="col">院系</th><th scope="col">面积</th>'
            $('#tbody1').append(table_head)
            addTableBody(obj.newBuilding)

        }

    }

    const addTableBody = function (arr){
        arr.forEach((item,i)=>{
            let table_body = ''
            item.forEach((data,j)=>{
                table_body = table_body + '<td>' + data + '</td>>'
            })
            table_body = '<tr>' + table_body + '</tr>'
            $('#tbody2').append(table_body)
        })
    }


