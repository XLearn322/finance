// Delgetstei ajillah controller
var uiController = (function(){

    var DOMstrings = {
        inputType: ".add__type",
        inputDescription: ".add__description",
        inputValue: ".add__value",
        addBtn: ".add__btn"
    }
        return {
        getInput: function(){
            return {
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
                

            };
        },
        getDOMstrings: function(){
            return DOMstrings;
        }
    };

})();

// sanhuutei ajillah controller
var financeController = (function(){

    var Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
      }
      
    var Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
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
        }
      };
    return {
        addItem: function(type, desc, val){
            var item, id;

            if(data.items[type].length === 0) id = 1;
            else{
                id = data.items[type][data.items[type].length - 1].id + 1;
            }
            
            if(type === "inc"){
                item = new Income(id, desc, val);
            }else{
                item = new Expense(id, desc, val);
            }

            data.items[type].push(item);
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
        // 2. olj avsan ogogdluudee sanhuugiin controllert damjuulan tend hadgalna.
        financeController.addItem(input.type, input.description, input.value);
        // 3. olj avsan ogogdluudee web deeree tohiroh hesegt gargana.

        // 4. tosviig tootsoolno.

        // 5. etssiin uldegdel, tootsoog delgtetsend gargana.
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
            setupEventListeners();
        }
    }

})(uiController, financeController);

appController.init();