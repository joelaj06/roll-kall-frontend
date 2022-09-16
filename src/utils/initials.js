export function printInitials(name) {
    var fname = '';
    var lname = '';
    fname = name[0];
    for (let i = 0; i < name.length; i++) {
       if (name[i] === ' ') {
          lname = name[i + 1];
          break;
       }
    }
 
    let stdName = fname + lname;
    return stdName;
 }