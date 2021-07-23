// Delgetstei ajillah controller
var uiController = (function(){


})();

// sanhuutei ajillah controller
var financeController = (function(){

})();

// programiin holbogch controller
var appController = (function(uiController, financeController){

    var ctrlAddItem = function(){
        // 1. oruulah ogogdliig delgetsees olj avna.
        console.log('clicked');
        // 2. olj avsan ogogdluudee sanhuugiin controllert damjuulan tend hadgalna.

        // 3. olj avsan ogogdluudee web deeree tohiroh hesegt gargana.

        // 4. tosviig tootsoolno.

        // 5. etssiin uldegdel, tootsoog delgtetsend gargana.
    }

    document.querySelector('.add__btn').addEventListener('click', function(){
        ctrlAddItem();
    });

    document.addEventListener('keypress', function(event){
        if(event.keyCode === 13 || event.which === 13){
        ctrlAddItem();
        }
    });

})(uiController, financeController);