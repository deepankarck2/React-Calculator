import { useState } from "react";

function Calculate_func(e){
    const [current_display , setCurrent_display ] = useState("");
    const [current_eval, setCurrent_eval] = useState("");
    // const [ac_flag, setAc_flag] = useState(false);
    // const [last_ans, setLast_ans] = useState ("");
    // const [reset, setReset] = useState(false); 
    //let current_display = ""; 
    //let current_eval = "";
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
                console.log(result);
                last_ans = result;
                
                display.current.value = result;
                display2.current.value = `${current_display}=`;
            }catch{
               display.current.value = "Error!";
               
            }
            eq.current.innerHTML = 'AC';
            
            ac_flag = true; 
            //current_display = "";
            setCurrent_display("");
            //current_eval= "";
            setCurrent_eval("");
            reset = true;
        }
        else{
           // current_display += clicked_btn; 
            setCurrent_display(current_display + clicked_btn);
            //current_eval += clicked_eval
            setCurrent_eval( current_eval + clicked_eval);
            console.log(current_eval);
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
}

export default Calculate_func;