let productList=[]

export function initProduct(remotedate){
    productList=remotedate
}

export function getProductItem(id){
     for(var i=0;i<productList.length;i++){
            if(productList[i]["id"]==id){
                return productList[i]
            }     
     }
     return '';
}

export function getProductVal(id,key){
    for(var i=0;i<productList.length;i++){
           if(productList[i]["id"]==id){
               return productList[i].hasOwnProperty(key) ? productList[i][key]:''
           }     
    }
    return '';
}

