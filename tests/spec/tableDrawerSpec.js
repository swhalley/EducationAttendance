describe( 'School Attendance Table', function() {

    describe( 'When Adding Meta Data', function(){
        it( 'Will Calculate the correct attendance difference', function(){

            //(current - past)/ past
            var headers = ['placeholder','1','2','3','4','5','6'];
            var data = [['placeholder','10','0','0','0','0','12']];
            var sut = new SchoolAttendanceTable( headers, data);
            sut.addMetaData();

            let actual = sut.data[0].slice(-1)[0].v;
            expect( actual ).toBe( .20 );
        });

    });
});