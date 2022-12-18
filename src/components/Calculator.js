import '../index.css';
import { useState, useRef } from 'react';

function Calculator(){
    //const [current_display , setCurrent_display ] = useState("");
    // const [current_eval, setCurrent_eval] = useState("");
    // const [ac_flag, setAc_flag] = useState(false);
    // const [last_ans, setLast_ans] = useState ("");
    // const [reset, setReset] = useState(false); 
    let current_display = ""; 
    let current_eval = "";
    let ac_flag = false; 
    let last_ans = ''; 
    let reset = false;
 
    const display = useRef();
    const display2 = useRef();
    const eq = useRef();

    function Cal(e){    
        const clicked_btn = e.target.dataset.show;
        const clicked_eval = e.target.dataset.val;

        console.log(clicked_btn)
        if(reset){
            clear();
            reset = false;
        }

        if(clicked_btn == 'AC'){
            clear();
        }
        else if(clicked_btn == '!'){
            current_display += clicked_btn;
            display.value = current_display;
            const fact_index = current_display.indexOf('!');
            const fact_num = parseInt(current_display[fact_index-1]); 
            current_eval = current_eval.substring(0, current_eval.length - 1);

            current_eval += fact(fact_num);
            console.log(`Curr eval = ${current_eval}`); 
        }
        else if(clicked_btn == 'power'){
            current_display += '^(';
            const n = current_display[current_display.length-3]
            console.log(current_display);
            display.value = current_display;
            current_eval = current_eval.substring(0, current_eval.length - 1);
            current_eval += `Math.pow(${n},`
            console.log(n);
        }
        else if(clicked_btn == 'ans'){
            console.log(last_ans);
            current_eval = last_ans;
            current_display = 'Ans';
            display.current.value = current_display;
        }
        else if(clicked_btn == 'euqal'){
            let result = "";
            try{
                console.log(current_eval);
                result = eval(current_eval);
                last_ans = result;
                display.current.value = result;
                display2.current.value = `${current_display}=`;
            }catch{
               display.current.value = "Error!";
               
            }
            eq.current.innerHTML = 'AC';
            
            ac_flag = true; 
            current_display = "";
            current_eval= "";
            reset = true;
        }
        else{
            current_display += clicked_btn; 
            //setCurrent_display(current_display + clicked_btn);
            current_eval += clicked_eval
            console.log(current_display);
            display.current.value = current_display;
        }


        function fact(num) {
            const facto = document.querySelector('.fact0'); 
            var result = num;
        
            if (num === 0 || num === 1) 
              return 1; 
            while (num > 1) { 
              num--;
              result *= num;
            }
            return result;
        }
          
        function clear(){
            if(ac_flag == false){
                CE();
            }else{
                AC();
                ac_flag = false;
            }
        }
        function AC(){
            display.current.value = "0"; 
            current_display = "";
            current_eval= "";
            display2.current.value = "";
            eq.current.innerHTML = 'CE';
        }
        function CE(){
            current_display= current_display.substring(0, current_display.length - 1);
            current_eval = current_eval.substring(0, current_eval.length - 1);
            display.current.value = current_display;
        } 
    }


    return (
    <div class="wrap-full">
        <div class="display">
            <input disabled class="result1 result" type="text" value=""  ref={display2} id="display2"/> 
            <input disabled class="result2 result" type="text" value="0" ref={display} id="display"/> 
        </div>

        <div class="calculator">
                <table class="left">
                    <tr>
                        <td><button data-show="Rad(" data-val="" class="cell operator" onClick={ Cal }>Rad</button></td>
                        <td><button data-show="Deg(" data-val="" class="cell operator" onClick={ Cal }>Deg</button></td>
                        <td><button data-show="!" data-val="!" class="cell operator facto btn" onClick={ Cal }>x!</button></td>
                    </tr>
                    <tr>
                        <td><button data-show="" data-val="" class="cell operator" onClick={ Cal }>Inv</button></td>
                        <td><button data-show="sin(" data-val="Math.sin(" class="cell operator btn" onClick={ Cal }>sin</button></td>
                        <td><button data-show="ln(" data-val="Math.exp(" class="cell operator btn" onClick={ Cal }>In</button></td>
                    </tr>
                    <tr>
                        <td><button data-show="xπ" data-val="*Math.PI" class="cell operator btn" onClick={ Cal }>π</button></td>
                        <td><button data-show="cos(" data-val="Math.cos(" class="cell operator btn" onClick={ Cal }>cos</button></td>
                        <td><button data-show="log(" data-val="Math.log10(" class="cell operator btn" onClick={ Cal }>log</button></td>
                    </tr>
                    <tr>
                        <td><button data-show="e(" data-val="Math.exp(" class="cell operator btn" onClick={ Cal }>e</button></td>
                        <td><button data-show="tan(" data-val="Math.tan(" class="cell operator btn" onClick={ Cal }>tan</button></td>
                        <td><button data-show="√(" data-val="Math.sqrt(" class="cell operator btn" onClick={ Cal }>√</button></td>
                    </tr>
                    <tr>
                        <td><button data-show='ans' class="cell operator btn" onClick={ Cal }>Ans</button></td>
                        <td><button data-show="E(" data-val="(10**" class="cell operator btn" onClick={ Cal }>Exp</button></td>
                        <td><button data-show="power" class="cell operator btn" onClick={ Cal }>x<sup>y</sup></button></td>
                    </tr>
                </table>
                <table class="right">
                    <tr>
                        <td><button data-show="(" data-val="(" class="cell operator btn" onClick={ Cal }>(</button></td>
                        <td><button data-show=")" data-val=")"class="cell operator btn" onClick={ Cal }>)</button></td>
                        <td><button data-show="%" data-val="%" class="cell operator btn" onClick={ Cal }>%</button></td>
                        <td><button data-show="AC" class="cell operator btn" id="eq" ref={eq} onClick={ Cal }>CE</button></td>
                    </tr>
                    <tr>
                        <td><button data-show="7" data-val="7" class="cell digits btn" onClick={ Cal }>7</button></td>
                        <td><button data-show="8" data-val="8" class="cell digits btn" onClick={ Cal }>8</button></td>
                        <td><button data-show="9" data-val="9" class="cell digits btn" onClick={ Cal }>9</button></td>
                        <td><button data-show="/" data-val="/" class="cell operator btn" onClick={ Cal }>÷</button></td>
                    </tr>
                    <tr>
                        <td><button data-show="4" data-val="4" class="cell digits btn" onClick={ Cal }>4</button></td>
                        <td><button data-show="5" data-val="5" class="cell digits btn" onClick={ Cal }>5</button></td>
                        <td><button data-show="6" data-val="6" class="cell digits btn" onClick={ Cal }>6</button></td>
                        <td><button data-show="x" data-val="*" class="cell operator btn" onClick={ Cal }>x</button></td>
                    </tr>
                    <tr>
                        <td><button data-show="1" data-val="1" class="cell digits btn" onClick={ Cal }>1</button></td>
                        <td><button data-show="2" data-val="2" class="cell digits btn" onClick={ Cal }>2</button></td>
                        <td><button data-show="3" data-val="3" class="cell digits btn" onClick={ Cal }>3</button></td>
                        <td><button data-show="-" data-val="-" class="cell operator btn" onClick={ Cal }>-</button></td>
                    </tr>
                    <tr>
                        <td><button data-show="0" data-val="0" class="cell digits btn" onClick={ Cal }>0</button></td>
                        <td><button data-show="." data-val="." class="cell digits btn" onClick={ Cal }>.</button></td>
                        <td><button data-show="euqal" class="cell euqal btn" onClick={ Cal }>=</button></td>
                        <td><button data-show="+" data-val="+" class="cell operator btn" onClick={ Cal }>+</button></td>
                    </tr>
                </table>
        </div>
    </div>
    )
}

export default Calculator;