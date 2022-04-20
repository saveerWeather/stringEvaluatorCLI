const { stdin, stdout} = require('process');

var count; 
compute = (math="",bool=false)=>{
    
    if(bool) console.log("\n--------------------");
    if(math.includes("S")||math.includes("C")||math.includes("T")){
       console.log(math);
    }else{
        console.log(math);
    }
   
    if(bool) {count = 0}else {count++;}
    if(count>20) return "Too much work I'd rather not";
  
    if(bool){
        if(math.split("(").length!=math.split(")").length) return "Unknown Operation";
    }
   // if(math.split("(").length!=math.split(")").length) return "Unknown Operation";
    math = String(math);
    math = math.split(' ').join('');
    math = trigchange(math);
   
    if(!charCheck(math)) return "Unknown Operation";

    if(isNumeric(math)){ return math}; 
 
  //  var l = new LinkedList(); 
    var s = new stack(); 
    
    x=""
    for(var i = 0; i< math.length; i++){
        
        var char = math.charAt(i);
       
       
        if(char=="("){
         
            
            
            if(i>0){
              
                if((!isOp(math.charAt(i-1)))&&(!isParen(math.charAt(i-1)))){
                    
                    x+="*";
                    
                    
                }
            
            }
            s.push(x);
            x="";
        }
        else if(char ==")"){
           
            output = shorteval(x);
            var ret = output; 
           var add= 0; 
            if(i<math.length-1){
                if(!isOp(math.charAt(i+1))&&(!isParen(math.charAt(i+1)))){
                    
                    ret += "*"; 
                    add = 1; 
                }
                
            }
            ret+= math.substring(i+1,math.length); 
           
            
            
            if(!s.isEmpty()){
                ret = s.pop() + ret; 
            }
            
            while(!s.isEmpty()){
                ret = s.pop() +"(" +ret; 
            }
           
            return compute(ret);
        }
        else{
            x += char; 
        }
        s.print();
        
    }
     return shorteval(x);
}
isNumeric= (num)=>{
  return (!isNaN(num))||num==".";
}
isOp = (op)=>{
    return "*/+-^SCT".includes(op) && op!='';
}
charCheck = (math)=>{
   
    for(var i = 0; i<math.length;i++){
        var c = math.charAt(i);
        if(!isOp(c) && !isNumeric(c) && !isParen(c)){
            return false;
        }
    }
    return true; 
}
isParen = (ch)=>{
    return "()".includes(ch) && ch!= '';
}
shorteval = (input)=>{
    
    x="";
    var numbersBreakdown=[];
    var operationBreakdown = [];
    var justpushed = true; 
    if(isNumeric(input)) return input; 

    for(var i = 0; i<input.length;i++){
        
        if(isNumeric(input.charAt(i))||justpushed==true){
            x+=input.charAt(i);
          
           justpushed =false; 
        }else{
            
            numbersBreakdown.push(x);
            operationBreakdown.push(input.charAt(i));
            justpushed = true; 
            x="";
            
        }
    }
    if(x!='') numbersBreakdown.push(x);
    if(input.includes("S")||input.includes("T")||input.includes("C")){
        return shorteval(trig(numbersBreakdown,operationBreakdown));
    }
    if(input.includes("^")){
        return shorteval(power(numbersBreakdown,operationBreakdown));
    }
    if(input.includes("*")||input.includes("/")){
        return shorteval(mulDiv(numbersBreakdown,operationBreakdown));
    }
    if(input.includes("+")||input.includes("-")){
        return shorteval(addSub(numbersBreakdown,operationBreakdown));
    }
    
    return "Unknown Operation"
    //return eval(input);
}
trig = (nums,ops)=>{
  
   
     var cur = ops.length; 
    for( var idx = 0;idx < cur;idx++){
       
            if(ops[idx]== "S"){
                newval = String(parseFloat(nums[idx]) * Math.sin(parseFloat(nums[idx+1])));
                nums[idx] = newval; 
                nums.splice(idx+1,1);
                ops.splice(idx,1);
              
            }else if(ops[idx]=="C"){
                newval = String(parseFloat(nums[idx]) * Math.cos(parseFloat(nums[idx+1])));
                nums[idx] = newval; 
                nums.splice(idx+1,1);
                ops.splice(idx,1);
            }else if(ops[idx]=="T"){
               
                newval = String(parseFloat(nums[idx]) * Math.tan(parseFloat(nums[idx+1])));
               
                nums[idx] = newval; 
                nums.splice(idx+1,1);
                ops.splice(idx,1); 
                
            }

        
    }
    
    
        var ret= "";
        for(var i = 0; i<ops.length;i++){
           
            ret+= nums[i] + ops[i];
            
        }
        ret += nums[nums.length - 1];
        
        return ret; 
    
    

}
power = (nums,ops)=>{
    var idx = ops.lastIndexOf('^'); 
    if(idx<0){
        var ret= "";
        for(var i = 0; i<ops.length;i++){
           
            ret+= nums[i] + ops[i];
           
        }
        ret += nums[nums.length - 1];
        return ret; 
    }
    newval = String(parseFloat(nums[idx]) ** parseFloat(nums[idx+1]));
    nums[idx] = newval; 
    nums.splice(idx+1,1);
    ops.splice(idx,1);
    return power(nums,ops);



}
addSub= (nums,ops)=>{
    ;
    var value = parseFloat(nums[0]);
    for(var i = 0; i<ops.length;i++){
        if(ops[i]=='+'){
            
            value += parseFloat(nums[i+1]);
        }else if(ops[i]=='-'){
         
      
            
            value -= parseFloat(nums[i+1]);
        }else{
           
            return "ERROR UNKNOWN OPERATIONS";
        }
        
    }
    return String(value);
}
mulDiv = (nums,ops)=>{

    var firstMul = ops.indexOf("*");
    
    var firstDiv = ops.indexOf("/")

    if(firstMul<0 &&firstDiv<0){
        var ret= "";
        for(var i = 0; i<ops.length;i++){
           
            ret+= nums[i] + ops[i];
           
        }
        ret += nums[nums.length - 1];
        return ret; 
    }
    if(firstMul<0) firstMul = ops.length;
    if(firstDiv<0) firstDiv = ops.length;
    var newval = "";
    if(firstMul<firstDiv){
        newval = String(parseFloat(nums[firstMul]) * parseFloat(nums[firstMul+1]));
        nums[firstMul] = newval; 
        nums.splice(firstMul+1,1);
        ops.splice(firstMul,1);
        
    }else{
        
        newval = String(parseFloat(nums[firstDiv]) / parseFloat(nums[firstDiv+1]));
        nums[firstDiv] = newval; 
        nums.splice(firstDiv+1,1);
        ops.splice(firstDiv,1);
    }
    
    return mulDiv(nums,ops);


}
trigchange = math=>{
    //changed = math.replace(/-sin/g,'(-1)S');
    //changed = changed.replace(/-cos/g,'(-1)C');
    //changed = changed.replace(/-tan/g,'(-1)T');
    changed = math.replace(/sin/g,'(1)S');
    changed = changed.replace(/cos/g,'(1)C');
    changed = changed.replace(/tan/g,'(1)T');i like men asf
    return changed; 
}
class node{
    data; 
    next; 
    constructor(d){
        this.data = d; 
    }
}
class stack{
    top;
    isEmpty=()=>{
        return this.top==null;
    }
    peek=()=>{
        return this.top.data;
    }
    push=(data)=>{
        var nod = new node(data);
        nod.next = this.top; 
        this.top = nod;  
       
    }
    pop=()=>{
        var data = this.top.data; 
        this.top = this.top.next; 
        return data; 
    }
    print(){
        var cur = this.top; 
        while(cur){
            
            cur = cur.next; 
        }
    }
    
}
var rl = require('readline').createInterface({
  input: stdin,
  output: stdout
});

var run = ()=> {
  rl.question('\nExpression: ', function (answer) {
    if (answer == 'exit') //we need some base case, for recursion
      return rl.close(); //closing RL and returning from function.
    console.log('meowfu-------------------\nThe answer is ', compute(answer,true) +".");
    run(); //Calling this function again to ask new question
  });
};

run();


