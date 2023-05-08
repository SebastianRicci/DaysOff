import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import TranslateIcon from "@mui/icons-material/Translate";

export default function HolidayLanguageInput({
  languages,
  holidayLanguage,
  setHolidayLanguage,
}) {
  const handleLanguage = (event, newLanguage) => {
    setHolidayLanguage(newLanguage);
  };

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
        options={languages.map((language) => ({
          name: language.name,
          code: language.code,
        }))}
        isOptionEqualToValue={(option, value) => option.name === value.name}
        autoHighlight
        disableClearable
        value={holidayLanguage}
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
              autoComplete: "new-password",
              type: "search",
            }}
          />
        )}
      />
    </div>
  );
}
