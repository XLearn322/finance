// Delgetstei ajillah controller
var uiController = (function(){

    var DOMstrings = {
        inputType: ".add__type",
        inputDescription: ".add__description",
        inputValue: ".add__value",
        addBtn: ".add__btn",
        incomeList: ".income__list",
        expenseList: ".expenses__list",
        tusuvLabel: ".budget__value",
        incomeLabel: ".budget__income--value",
        expenseLabel: ".budget__expenses--value",
        persentageLabel: ".budget__expenses--percentage",
    }
        return {
        getInput: function(){
            return {
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseInt(document.querySelector(DOMstrings.inputValue).value)
                

            };
        },
        getDOMstrings: function(){
            return DOMstrings;
        },

        clearFields: function(){
            var fields = document.querySelectorAll(DOMstrings.inputDescription + "," + DOMstrings.inputValue);

            // convert list to array
            var fieldsArr = Array.prototype.slice.call(fields);

            fieldsArr.forEach(function(el, index, array){
                el.value = "";
            });

            fieldsArr[0].focus();

            // for(var i = 0; i < fieldsArr.length; i++){
            //     fieldsArr[i].value = "";
            // }
        },

        tusviigUzuuleh: function(tusuv){

            // tusuv: data.tusuv,
            // huvi: data.huvi,
            // totalInc: data.totals.inc,
            // totalExp: data.totals.exp,
            document.querySelector(DOMstrings.tusuvLabel).textContent = tusuv.tusuv;
            document.querySelector(DOMstrings.incomeLabel).textContent = tusuv.totalInc;
            document.querySelector(DOMstrings.expenseLabel).textContent = tusuv.totalExp;

            if(tusuv.huvi !== 0){
            document.querySelector(DOMstrings.persentageLabel).textContent = tusuv.huvi + "%";
        }else{
            document.querySelector(DOMstrings.persentageLabel).textContent = tusuv.huvi;
            }
        },

        addListItem: function(item, type){
            // 1. orlogo zarlagiin elementiig aguulsan html iig beltgene.
            var html, list;
      if (type === "inc") {
        list = DOMstrings.incomeList;
        html =
          '<div class="item clearfix" id="income-%id%"><div class="item__description">$$DESCRIPTION$$</div><div class="right clearfix"><div class="item__value">$$VALUE$$</div><div class="item__delete">            <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div>        </div></div>';
      } else {
        list = DOMstrings.expenseList;
        html =
          '<div class="item clearfix" id="expense-%id%"><div class="item__description">$$DESCRIPTION$$</div>          <div class="right clearfix"><div class="item__value">$$VALUE$$</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn">                <i class="ion-ios-close-outline"></i></button></div></div></div>';
      }
      // Ð¢ÑÑ€ HTML Ð´Ð¾Ñ‚Ñ€Ð¾Ð¾ Ð¾Ñ€Ð»Ð¾Ð³Ð¾ Ð·Ð°Ñ€Ð»Ð°Ð³Ñ‹Ð½ ÑƒÑ‚Ð³ÑƒÑƒÐ´Ñ‹Ð³ REPLACE Ð°ÑˆÐ¸Ð³Ð»Ð°Ð¶ Ó©Ó©Ñ€Ñ‡Ð¸Ð»Ð¶
      html = html.replace("%id%", item.id);
      html = html.replace("$$DESCRIPTION$$", item.description);
      html = html.replace("$$VALUE$$", item.value);
     

      // Ð‘ÑÐ»Ñ‚Ð³ÑÑÑÐ½ HTML ÑÑ DOM Ñ€ÑƒÑƒ Ñ…Ð¸Ð¹Ð¶ Ó©Ð³Ð½Ó©.
      document.querySelector(list).insertAdjacentHTML("beforeend", html);
        }
    };

})();

// sanhuutei ajillah controller
var financeController = (function(){

    var Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
      };
      
    var Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
      };

      var calculateTotal = function(type){
        var sum = 0;  
        data.items[type].forEach(function(el){
            sum = sum + el.value;
          });
          
          data.totals[type] = sum;
      }

// private data
    var data = {
        items: {
          inc: [],
          exp: []
        },
        totals: {
          inc: 0,
          exp: 0
        },
        tusuv: 0,

        huvi: 0
      };
    return {
        tusuvTootsooloh: function(){
            // niit orlogiin niilberiig tootsoolno
            calculateTotal('inc');
            // niit zarlagiin niilberiig tootsoolno
            calculateTotal('exp');
            // tusviig shineer tootsoolno
            data.tusuv = data.totals.inc - data.totals.exp;
            // orlogo zarlagiin huviig tootsoolno
            data.huvi = Math.round(( data.totals.exp / data.totals.inc ) * 100);

        },

        tusviigAvah: function(){
            return {
                tusuv: data.tusuv,
                huvi: data.huvi,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
            }
        },

        addItem: function(type, desc, val){
            var item, id;

            if(data.items[type].length === 0) {id = 1;}
            else{
                id = data.items[type][data.items[type].length - 1].id + 1;
            }
            
            if(type === "inc"){
                item = new Income(id, desc, val);
            }else{
                item = new Expense(id, desc, val);
            }

            data.items[type].push(item);

            return item;
        },
        seeData: function(){
            return data;
        }
    };
    


})();

// programiin holbogch controller
var appController = (function(uiController, financeController){

    var ctrlAddItem = function(){
        // 1. oruulah ogogdliig delgetsees olj avna.
        var input = uiController.getInput();

        if(input.description !== "" && input.value !== ""){
            // 2. olj avsan ogogdluudee sanhuugiin controllert damjuulan tend hadgalna.
        
            var item = financeController.addItem(input.type, input.description, input.value);

            // 3. olj avsan ogogdluudee web deeree tohiroh hesegt gargana.
            uiController.addListItem(item, input.type);
            uiController.clearFields();

            // 4. tosviig tootsoolno.
            financeController.tusuvTootsooloh();

            // 5. etssiin uldegdel, tootsoog delgtetsend gargana.
            var tusuv = financeController.tusviigAvah();

            // 6. tusviig tootsoog delgetsend gargana.
            uiController.tusviigUzuuleh(tusuv);
        }
        

        
    };

    var setupEventListeners = function(){
        var DOM = uiController.getDOMstrings();

        document.querySelector(DOM.addBtn).addEventListener('click', function(){
            ctrlAddItem();
        });
    
        document.addEventListener('keypress', function(event){
            if(event.keyCode === 13 || event.which === 13){
            ctrlAddItem();
            }
        });
    }

    return {
        init: function(){
            console.log('Application started...');
            uiController.tusviigUzuuleh({
                tusuv: 0,
                huvi: 0,
                totalInc: 0,
                totalExp: 0,
            });
            setupEventListeners();
        }
    }

})(uiController, financeController);

appController.init();