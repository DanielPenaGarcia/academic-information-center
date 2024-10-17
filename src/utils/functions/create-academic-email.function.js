export function createAcademicEmail(userInformation) {
    if (!userInformation) {
        throw new Error("Invalid user information");
    }
    
    const domain = 'potros.itson.edu.mx';
    const { names, fatherLastName, academicId } = userInformation;

    const firstName = latiniseString(names.split(' ')[0]).toLowerCase();
    const lastName = latiniseString(fatherLastName).toLowerCase();
    
    // Construir el correo electrónico
    const email = `${firstName}.${lastName}${academicId}@${domain}`;
    
    return email;
}

// Mapa de caracteres acentuados a letras latinas
const Latinise = {
    latin_map: {
        "á": "a", "à": "a", "â": "a", "ä": "a", "ã": "a", "å": "a", "ā": "a",
        "ç": "c", "ć": "c", "č": "c",
        "é": "e", "è": "e", "ê": "e", "ë": "e", "ē": "e", "ė": "e", "ę": "e", "ě": "e",
        "í": "i", "ì": "i", "î": "i", "ï": "i", "ī": "i", "į": "i", "ı": "i",
        "ñ": "n", "ń": "n", "ň": "n",
        "ó": "o", "ò": "o", "ô": "o", "ö": "o", "õ": "o", "ø": "o", "ō": "o", "ő": "o",
        "ú": "u", "ù": "u", "û": "u", "ü": "u", "ū": "u", "ů": "u", "ű": "u", "ų": "u",
        "ý": "y", "ÿ": "y", "ŷ": "y",
        "Á": "A", "À": "A", "Â": "A", "Ä": "A", "Ã": "A", "Å": "A", "Ā": "A",
        "Ç": "C", "Ć": "C", "Č": "C",
        "É": "E", "È": "E", "Ê": "E", "Ë": "E", "Ē": "E", "Ė": "E", "Ę": "E", "Ě": "E",
        "Í": "I", "Ì": "I", "Î": "I", "Ï": "I", "Ī": "I", "Į": "I", "I": "I",
        "Ñ": "N", "Ń": "N", "Ň": "N",
        "Ó": "O", "Ò": "O", "Ô": "O", "Ö": "O", "Õ": "O", "Ø": "O", "Ō": "O", "Ő": "O",
        "Ú": "U", "Ù": "U", "Û": "U", "Ü": "U", "Ū": "U", "Ů": "U", "Ű": "U", "Ų": "U",
        "Ý": "Y", "Ÿ": "Y", "Ŷ": "Y",
        "ʃ": "S", "Ꞩ": "S", "ẛ": "S", "Ť": "T", "Ţ": "T", "Ṫ": "T", "Ṭ": "T", 
        "Ƭ": "T", "Ʈ": "T", "Ⱦ": "T", "Ṱ": "T", "Ṯ": "T", "ⱦ": "T",
        "Ư": "U", "Ứ": "U", "Ự": "U", "Ừ": "U", "Ử": "U", "Ữ": "U", 
        "Ü": "U", "Ū": "U", "Ů": "U", "Ű": "U", "ų": "U", "Ǔ": "U", 
        "Ǖ": "U", "Ǚ": "U", "Ọ": "U", "Ǔ": "U", "Û": "U", "Ũ": "U", 
        "Ṳ": "U", "Ṷ": "U", "Ṵ": "U", "Ʊ": "U", "ꞓ": "U",
        "Ꞝ": "V", "Ṽ": "V", "Ṿ": "V", "Ʋ": "V", "ⱱ": "V",
        "Ẽ": "E", "Ẏ": "Y", "Ý": "Y", "Ŷ": "Y", "Ÿ": "Y", "Ỳ": "Y", 
        "Ỷ": "Y", "Ỹ": "Y", "Ȳ": "Y", "ȶ": "Y", "Ƴ": "Y", "ẏ": "Y",
        "Ƶ": "Z", "Ź": "Z", "Ž": "Z", "Ẓ": "Z", "Ẕ": "Z", "Ƶ": "Z", 
        "Ɀ": "Z", "Ȥ": "Z", "ẞ": "SS",
        "ʔ": "A", "ʕ": "A", "ʢ": "A", "ʌ": "V", "ʋ": "V", "ʊ": "U", 
        "ʔ": "A", "ʕ": "A", "ʡ": "Q"
    }
};

// Función para reemplazar caracteres usando el mapa
function latiniseString(str) {
    return str.split('').map(function(char) {
        return Latinise.latin_map[char] || char; // Reemplaza el carácter o deja el original si no se encuentra
    }).join('');
}