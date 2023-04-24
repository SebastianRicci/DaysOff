import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import TranslateIcon from "@mui/icons-material/Translate";

export default function HolidayLanguageInput({
  holidayLanguage,
  setHolidayLanguage,
}) {
  const handleLanguage = (event, newLanguage) => {
    setHolidayLanguage(newLanguage);
  };

  const languages = [
    {
      code: "af",
      name: "Afrikaans",
    },
    {
      code: "ak",
      name: "Akan",
    },
    {
      code: "am",
      name: "Amharic",
    },
    {
      code: "ar",
      name: "Arabic",
    },
    {
      code: "as",
      name: "Assamese",
    },
    {
      code: "ay",
      name: "Aymara",
    },
    {
      code: "az",
      name: "Azerbaijani",
    },
    {
      code: "be",
      name: "Belarusian",
    },
    {
      code: "bg",
      name: "Bulgarian",
    },
    {
      code: "bh",
      name: "Bihari",
    },
    {
      code: "bn",
      name: "Bengali",
    },
    {
      code: "bs",
      name: "Bosnian",
    },
    {
      code: "ca",
      name: "Catalan, Valencian",
    },
    {
      code: "ceb",
      name: "Cebuano",
    },
    {
      code: "co",
      name: "Corsican",
    },
    {
      code: "cs",
      name: "Czech",
    },
    {
      code: "cy",
      name: "Welsh",
    },
    {
      code: "da",
      name: "Danish",
    },
    {
      code: "de",
      name: "German",
    },
    {
      code: "dv",
      name: "Divehi",
    },
    {
      code: "ee",
      name: "Ewe",
    },
    {
      code: "el",
      name: "Modern Greek",
    },
    {
      code: "en",
      name: "English",
    },
    {
      code: "eo",
      name: "Esperanto",
    },
    {
      code: "es",
      name: "Spanish, Castilian",
    },
    {
      code: "et",
      name: "Estonian",
    },
    {
      code: "eu",
      name: "Basque",
    },
    {
      code: "fa",
      name: "Persian",
    },
    {
      code: "fi",
      name: "Finnish",
    },
    {
      code: "fr",
      name: "French",
    },
    {
      code: "fy",
      name: "Western Frisian",
    },
    {
      code: "ga",
      name: "Irish",
    },
    {
      code: "gd",
      name: "Gaelic, Scottish Gaelic",
    },
    {
      code: "gl",
      name: "Galician",
    },
    {
      code: "gn",
      name: "Guaraní",
    },
    {
      code: "gu",
      name: "Gujarati",
    },
    {
      code: "ha",
      name: "Hausa",
    },
    {
      code: "haw",
      name: "Hawaiian",
    },
    {
      code: "he",
      name: "Hebrew",
    },
    {
      code: "hi",
      name: "Hindi",
    },
    {
      code: "hmn",
      name: "Hmong",
    },
    {
      code: "hr",
      name: "Croatian",
    },
    {
      code: "ht",
      name: "Haitian, Haitian Creole",
    },
    {
      code: "hu",
      name: "Hungarian",
    },
    {
      code: "hy",
      name: "Armenian",
    },
    {
      code: "id",
      name: "Indonesian",
    },
    {
      code: "ig",
      name: "Igbo",
    },
    {
      code: "is",
      name: "Icelandic",
    },
    {
      code: "it",
      name: "Italian",
    },
    {
      code: "ja",
      name: "Japanese",
    },
    {
      code: "jw",
      name: "Javanese",
    },
    {
      code: "ka",
      name: "Georgian",
    },
    {
      code: "kk",
      name: "Kazakh",
    },
    {
      code: "km",
      name: "Central Khmer",
    },
    {
      code: "kn",
      name: "Kannada",
    },
    {
      code: "ko",
      name: "Korean",
    },
    {
      code: "kri",
      name: "Krio",
    },
    {
      code: "ku",
      name: "Kurdish",
    },
    {
      code: "ky",
      name: "Kirghiz, Kyrgyz",
    },
    {
      code: "la",
      name: "Latin",
    },
    {
      code: "lb",
      name: "Luxembourgish, Letzeburgesch",
    },
    {
      code: "lg",
      name: "Ganda",
    },
    {
      code: "ln",
      name: "Lingala",
    },
    {
      code: "lo",
      name: "Lao",
    },
    {
      code: "lt",
      name: "Lithuanian",
    },
    {
      code: "lv",
      name: "Latvian",
    },
    {
      code: "mg",
      name: "Malagasy",
    },
    {
      code: "mi",
      name: "Maori",
    },
    {
      code: "mk",
      name: "Macedonian",
    },
    {
      code: "ml",
      name: "Malayalam",
    },
    {
      code: "mn",
      name: "Mongolian",
    },
    {
      code: "mr",
      name: "Marathi",
    },
    {
      code: "ms",
      name: "Malay",
    },
    {
      code: "mt",
      name: "Maltese",
    },
    {
      code: "my",
      name: "Burmese, Myanmar",
    },
    {
      code: "ne",
      name: "Nepali",
    },
    {
      code: "nl",
      name: "Dutch, Flemish",
    },
    {
      code: "no",
      name: "Norwegian",
    },
    {
      code: "nso",
      name: "Northern Sotho",
    },
    {
      code: "ny",
      name: "Chichewa, Chewa, Nyanja",
    },
    {
      code: "om",
      name: "Oromo",
    },
    {
      code: "or",
      name: "Odia",
    },
    {
      code: "pa",
      name: "Punjabi, Panjabi",
    },
    {
      code: "pl",
      name: "Polish",
    },
    {
      code: "ps",
      name: "Pashto, Pushto",
    },
    {
      code: "pt",
      name: "Portuguese",
    },
    {
      code: "qu",
      name: "Quechua",
    },
    {
      code: "ro",
      name: "Romanian, Moldavian, Moldovan",
    },
    {
      code: "ru",
      name: "Russian",
    },
    {
      code: "rw",
      name: "Kinyarwanda",
    },
    {
      code: "sa",
      name: "Sanskrit",
    },
    {
      code: "sd",
      name: "Sindhi",
    },
    {
      code: "si",
      name: "Sinhala, Sinhalese",
    },
    {
      code: "sk",
      name: "Slovak",
    },
    {
      code: "sl",
      name: "Slovenian",
    },
    {
      code: "sm",
      name: "Samoan",
    },
    {
      code: "sn",
      name: "Shona",
    },
    {
      code: "so",
      name: "Somali",
    },
    {
      code: "sq",
      name: "Albanian",
    },
    {
      code: "sr",
      name: "Serbian",
    },
    {
      code: "st",
      name: "South Sesotho",
    },
    {
      code: "su",
      name: "Sundanese",
    },
    {
      code: "sv",
      name: "Swedish",
    },
    {
      code: "sw",
      name: "Swahili",
    },
    {
      code: "ta",
      name: "Tamil",
    },
    {
      code: "te",
      name: "Telugu",
    },
    {
      code: "tg",
      name: "Tajik",
    },
    {
      code: "th",
      name: "Thai",
    },
    {
      code: "ti",
      name: "Tigrinya",
    },
    {
      code: "tk",
      name: "Turkmen",
    },
    {
      code: "tl",
      name: "Tagalog",
    },
    {
      code: "tr",
      name: "Turkish",
    },
    {
      code: "ts",
      name: "Tsonga",
    },
    {
      code: "tt",
      name: "Tatar",
    },
    {
      code: "ug",
      name: "Uyghur",
    },
    {
      code: "uk",
      name: "Ukrainian",
    },
    {
      code: "ur",
      name: "Urdu",
    },
    {
      code: "uz",
      name: "Uzbek",
    },
    {
      code: "vi",
      name: "Vietnamese",
    },
    {
      code: "xh",
      name: "Xhosa",
    },
    {
      code: "yi",
      name: "Yiddish",
    },
    {
      code: "yo",
      name: "Yoruba",
    },
    {
      code: "zh",
      name: "Chinese (Simplified)",
    },
    {
      code: "zh-TW",
      name: "Chinese (Traditional)",
    },
    {
      code: "zu",
      name: "Zulu",
    },
  ];

  return (
    <div className="HolidayLanguage">
      <div className="HolidayLanguageHeader">
        <TranslateIcon />
        Holiday Language
      </div>
      <Autocomplete
        id="language-select-demo"
        onChange={handleLanguage}
        sx={{ width: 300 }}
        options={languages}
        autoHighlight
        defaultValue={languages[24]}
        getOptionLabel={(option) => option.name}
        renderOption={(props, option) => (
          <Box
            component="li"
            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
            {...props}
          >
            {option.name}
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Choose a language"
            inputProps={{
              ...params.inputProps,
              autoComplete: "new-password", // disable autocomplete and autofill
            }}
          />
        )}
      />
    </div>
  );
}
