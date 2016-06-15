class SchoolAttendanceTable {

    constructor( schoolHeaders, schoolData){
        this._headers = schoolHeaders.slice(0);
        this._data = schoolData.slice(0);

        this.paging = true;
        this.pageSize = 20;
    }

    addMetaData(){
        let lastRecordIndex = this._headers.length -1;
        let recordsToCalculate = Math.floor( (lastRecordIndex) / 5);

        for(let i=1; i <= recordsToCalculate; i++){
            this._headers.push( `Last ${i*5} Years` );

            for( let j=0; j < this._data.length; j++ ){
                let current = this._data[j][lastRecordIndex];
                let past = this._data[j][lastRecordIndex - (5*i)];


                let change = ((current - past)/ past );
                let display = (past === 0) ? '-' : (change * 100).toFixed(2) + '%';

                this._data[j].push( { v: change, f: display} );
            }
        }

        return this;
    }

    draw( id ){
        google.charts.load('current', {'packages':['table']});
        google.charts.setOnLoadCallback( drawingTable.bind(this) );

        function drawingTable() {
            var data = new google.visualization.DataTable();

            data.addColumn( 'string', this._headers[0]);
            for( let i= 1; i < this._headers.length; i++){
                data.addColumn( 'number', this._headers[i]);
            }

            data.addRows( this._data );

            var table = new google.visualization.Table(document.getElementById(id));
            table.draw(data, {
                showRowNumber: false,
                page: this.paging ? 'enable' : 'disable',
                pageSize: this.pageSize,
                height: '100%',
                width: '100%'
            });
        };
    }

    get data(){
        return this._data;
    }

}

