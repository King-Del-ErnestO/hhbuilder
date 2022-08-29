// your code goes here ...
    var crudApp = new function () {

        // An array of JSON objects with values.
        this.myEntries = [
            { ID: '1', AGE: '34', Relationship: 'Parent', Smoker: "Yes" },
            { ID: '2', AGE: '54', Relationship: 'Child', Smoker: "No" },
            { ID: '3', AGE: '27', Relationship: 'Spouse', Smoker: "No" }
        ]

        this.relationship = ['Self', 'Spouse', 'Child', 'Parent', 'Grandparent', 'Others'];
        this.smoker = ["Yes", "No"];
        this.col = [];

        this.createTable = function () {

            // Extract value for table header.
            for (var i = 0; i < this.myEntries.length; i++) {
                for (var key in this.myEntries[i]) {
                    if (this.col.indexOf(key) === -1) {
                        this.col.push(key);
                    }
                }
            }

            // CREATE A TABLE.
            var table = document.createElement('table');
            table.setAttribute('id', 'booksTable');     // Set table id.

            var tr = table.insertRow(-1);               // Create a row (for header).

            for (var h = 0; h < this.col.length; h++) {
                // Add table header.
                var th = document.createElement('th');
                th.innerHTML = this.col[h].replace('_', ' ');
                tr.appendChild(th);
            }

            // Add rows using JSON data.
            for (var i = 0; i < this.myEntries.length; i++) {

                tr = table.insertRow(-1);           // Create a new row.

                for (var j = 0; j < this.col.length; j++) {
                    var tabCell = tr.insertCell(-1);
                    tabCell.innerHTML = this.myEntries[i][this.col[j]];
                }

                // Dynamically create and add elements to table cells with events.

                this.td = document.createElement('td');

                // *** CANCEL OPTION.
                tr.appendChild(this.td);
                var lblCancel = document.createElement('label');
                lblCancel.innerHTML = '✖';
                lblCancel.setAttribute('onclick', 'crudApp.Cancel(this)');
                lblCancel.setAttribute('style', 'display:none;');
                lblCancel.setAttribute('title', 'Cancel');
                lblCancel.setAttribute('id', 'lbl' + i);
                this.td.appendChild(lblCancel);

                // *** SAVE.
                tr.appendChild(this.td);
                var btSave = document.createElement('input');

                btSave.setAttribute('type', 'button');      // SET ATTRIBUTES.
                btSave.setAttribute('value', 'Save');
                btSave.setAttribute('id', 'Save' + i);
                btSave.setAttribute('style', 'display:none;');
                btSave.setAttribute('onclick', 'crudApp.Save(this)');       // ADD THE BUTTON's 'onclick' EVENT.
                this.td.appendChild(btSave);

                // *** UPDATE.
                tr.appendChild(this.td);
                var btUpdate = document.createElement('input');

                btUpdate.setAttribute('type', 'button');    // SET ATTRIBUTES.
                btUpdate.setAttribute('value', 'Update');
                btUpdate.setAttribute('id', 'Edit' + i);
                btUpdate.setAttribute('style', 'background-color:#44CCEB;');
                btUpdate.setAttribute('onclick', 'crudApp.Update(this)');   // ADD THE BUTTON's 'onclick' EVENT.
                this.td.appendChild(btUpdate);

                // *** DELETE.
                this.td = document.createElement('th');
                tr.appendChild(this.td);
                var btDelete = document.createElement('input');
                btDelete.setAttribute('type', 'button');    // SET INPUT ATTRIBUTE.
                btDelete.setAttribute('value', 'Delete');
                btDelete.setAttribute('style', 'background-color:#ED5650;');
                btDelete.setAttribute('onclick', 'crudApp.Delete(this)');   // ADD THE BUTTON's 'onclick' EVENT.
                this.td.appendChild(btDelete);
            }


            // ADD A ROW AT THE END WITH BLANK TEXTBOXES AND A DROPDOWN LIST (FOR NEW ENTRY).

            tr = table.insertRow(-1);           // CREATE THE LAST ROW.

            for (var j = 0; j < this.col.length; j++) {
                var newCell = tr.insertCell(-1);
                if (j >= 1) {

                    if (j == 2) {   // WE'LL ADD A DROPDOWN LIST AT THE SECOND COLUMN (FOR Relationship).

                        var select = document.createElement('select');      // CREATE AND ADD A DROPDOWN LIST.
                        select.innerHTML = '<option value=""></option>';
                        for (k = 0; k < this.relationship.length; k++) {
                            select.innerHTML = select.innerHTML +
                                '<option value="' + this.relationship[k] + '">' + this.relationship[k] + '</option>';
                        }
                        newCell.appendChild(select);
                    }
                    else if (j == 3) {   // WE'LL ADD A DROPDOWN LIST AT THE THIRD COLUMN (FOR Smoker).

                        var select = document.createElement('select');      // CREATE AND ADD A DROPDOWN LIST.
                        select.innerHTML = '<option value=""></option>';
                        for (k = 0; k < this.smoker.length; k++) {
                            select.innerHTML = select.innerHTML +
                                '<option value="' + this.smoker[k] + '">' + this.smoker[k] + '</option>';
                        }
                        newCell.appendChild(select);
                    }
                    else {
                        var tBox = document.createElement('input');          // CREATE AND ADD A TEXTBOX.
                        tBox.setAttribute('type', 'text');
                        tBox.setAttribute('value', '');
                        newCell.appendChild(tBox);
                    }
                }
            }

            this.td = document.createElement('td');
            tr.appendChild(this.td);

            var btNew = document.createElement('input');

            btNew.setAttribute('type', 'button');       // SET ATTRIBUTES.
            btNew.setAttribute('value', 'Create');
            btNew.setAttribute('id', 'New' + i);
            btNew.setAttribute('style', 'background-color:#207DD1;');
            btNew.setAttribute('onclick', 'crudApp.CreateNew(this)');       // ADD THE BUTTON's 'onclick' EVENT.
            this.td.appendChild(btNew);

            var div = document.getElementById('debug');
            div.innerHTML = '';
            div.appendChild(table);    // ADD THE TABLE TO THE WEB PAGE.
        };

        // ****** OPERATIONS START.

        // CANCEL.
        this.Cancel = function (oButton) {

            // HIDE THIS BUTTON.
            oButton.setAttribute('style', 'display:none; float:none;');

            var activeRow = oButton.parentNode.parentNode.rowIndex;

            // HIDE THE SAVE BUTTON.
            var btSave = document.getElementById('Save' + (activeRow - 1));
            btSave.setAttribute('style', 'display:none;');

            // SHOW THE UPDATE BUTTON AGAIN.
            var btUpdate = document.getElementById('Edit' + (activeRow - 1));
            btUpdate.setAttribute('style', 'display:block; margin:0 auto; background-color:#44CCEB;');

            var tab = document.getElementById('booksTable').rows[activeRow];

            for (i = 0; i < this.col.length; i++) {
                var td = tab.getElementsByTagName("td")[i];
                td.innerHTML = this.myBooks[(activeRow - 1)][this.col[i]];
            }
        }


        // EDIT DATA.
        this.Update = function (oButton) {
            var activeRow = oButton.parentNode.parentNode.rowIndex;
            var tab = document.getElementById('booksTable').rows[activeRow];

            // SHOW A DROPDOWN LIST WITH A LIST OF Relationships.
            for (i = 1; i < 4; i++) {
                if (i == 2) {
                    var td = tab.getElementsByTagName("td")[i];
                    var ele = document.createElement('select');      // DROPDOWN LIST.
                    ele.innerHTML = '<option value="' + td.innerText + '">' + td.innerText + '</option>';
                    for (k = 0; k < this.relationship.length; k++) {
                        ele.innerHTML = ele.innerHTML +
                            '<option value="' + this.relationship[k] + '">' + this.relationship[k] + '</option>';
                    }
                    td.innerText = '';
                    td.appendChild(ele);
                }
                // SHOW A DROPDOWN LIST WITH A LIST FOR SMOKERS
                if (i == 3) {
                    var td = tab.getElementsByTagName("td")[i];
                    var ele = document.createElement('select');      // DROPDOWN LIST.
                    ele.innerHTML = '<option value="' + td.innerText + '">' + td.innerText + '</option>';
                    for (k = 0; k < this.smoker.length; k++) {
                        ele.innerHTML = ele.innerHTML +
                            '<option value="' + this.smoker[k] + '">' + this.smoker[k] + '</option>';
                    }
                    td.innerText = '';
                    td.appendChild(ele);
                }
                else {
                    var td = tab.getElementsByTagName("td")[i];
                    var ele = document.createElement('input');      // TEXTBOX.
                    ele.setAttribute('type', 'text');
                    ele.setAttribute('value', td.innerText);
                    td.innerText = '';
                    td.appendChild(ele);
                }
            }

            var lblCancel = document.getElementById('lbl' + (activeRow - 1));
            lblCancel.setAttribute('style', 'cursor:pointer; display:block; width:20px; float:left; position: absolute;');

            var btSave = document.getElementById('Save' + (activeRow - 1));
            btSave.setAttribute('style', 'display:block; margin-left:30px; float:left; background-color:#2DBF64;');

            // HIDE THIS BUTTON.
            oButton.setAttribute('style', 'display:none;');
        };


        // DELETE DATA.
        this.Delete = function (oButton) {
            var activeRow = oButton.parentNode.parentNode.rowIndex;
            this.myEntries.splice((activeRow - 1), 1);    // DELETE THE ACTIVE ROW.
            this.createTable();                         // REFRESH THE TABLE.
        };

        // SAVE DATA.
        this.Save = function (oButton) {
            var activeRow = oButton.parentNode.parentNode.rowIndex;
            var tab = document.getElementById('booksTable').rows[activeRow];

            // UPDATE myBooks ARRAY WITH VALUES.
            for (i = 1; i < this.col.length; i++) {
                var td = tab.getElementsByTagName("td")[i];
                if (td.childNodes[0].getAttribute('type') == 'text' || td.childNodes[0].tagName == 'SELECT') {  // CHECK IF ELEMENT IS A TEXTBOX OR SELECT.
                    this.myEntries[(activeRow - 1)][this.col[i]] = td.childNodes[0].value;      // SAVE THE VALUE.
                }
            }
            this.createTable();     // REFRESH THE TABLE.
        }

        // CREATE NEW.
        this.CreateNew = function (oButton) {
            var activeRow = oButton.parentNode.parentNode.rowIndex;
            var tab = document.getElementById('booksTable').rows[activeRow];
            var obj = {};

            // ADD NEW VALUE TO myEntries ARRAY.
            for (i = 1; i < this.col.length; i++) {
                var td = tab.getElementsByTagName("td")[i];
                if (td.childNodes[0].getAttribute('type') == 'text' || td.childNodes[0].tagName == 'SELECT') {      // CHECK IF ELEMENT IS A TEXTBOX OR SELECT.
                    var txtVal = td.childNodes[0].value;
                    if (txtVal != '') {
                        if(this.col[i] == "AGE"){
                            if(isNaN(txtVal) == true){
                                obj = ''
                                alert("Please Age should be a number");
                                break;
                            }
                            else{
                                var age = parseInt(txtVal, 10);
                                if( age <= 0){
                                     obj = ''
                                     alert("Age must be greater zero");

                                }
                                else{
                                    obj[this.col[i]] = txtVal.trim();
                                   }
                        }
                    }
                    else{
                        obj[this.col[i]] = txtVal.trim();
                    }

                    }
                    else {
                        obj = '';
                        alert('all fields are compulsory');
                        break;
                    }
                }
            }
            obj[this.col[0]] = this.myEntries.length + 1;     // NEW ID.

            if (Object.keys(obj).length > 0) {      // CHECK IF OBJECT IS NOT EMPTY.
                this.myEntries.push(obj);             // PUSH (ADD) DATA TO THE JSON ARRAY.
                this.createTable();                 // REFRESH THE TABLE.
            }
        }

        // ****** OPERATIONS END.
    }

    crudApp.createTable();