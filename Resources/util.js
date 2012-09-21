exports.removeArrayDuplicates = function unique(a){
     a.sort();
     for(var i = 1; i < a.length; ){
         if(a[i-1] == a[i]){
            a.splice(i, 1);
         } else {
            i++;
         }
     }
     return a;
} 