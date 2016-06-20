function loadData( filePath ){
    return new Promise( resolve => {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                let response = xhr.responseText;

                let rawSchoolData = response.split(/\r\n|\n/).map( school => school.split( ',') );
                let headerRows = rawSchoolData.slice(0, 1)[0].filter( lineItem => !!lineItem );
                let schoolData = rawSchoolData.slice(1).map( school => school.slice( 0, headerRows.length));

				// Grab only the numbers, leaving behind the school names
				let enrollNumOnly = schoolData.map(school => school.slice(1));
				
				// Convert strings to numbers
				let fixedEnrolNumbersAsNumbers = enrollNumOnly.map(enrollCountList => enrollCountList.map(enrollCount => +enrollCount));
				
				// Rejoin school names with enroll data as numbers - assume no sorting happened since separation of numbers
				schoolData = schoolData.map((school, index) => [school[0]].concat(fixedEnrolNumbersAsNumbers[index])); 

                resolve( { headerRows, schoolData });
            }
        };

        xhr.open('GET', filePath);
        xhr.send(null);
    });
};