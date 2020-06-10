import React from "react";

const Language = (props) => {
    const languageData = props.languageData;

    // DEFAULT ANALYSIS TYPE IS (REPO COUNT WISE)
    const type = props.type;
    const { language_size_data, language_count_data, language_color_data } = languageData;
    const datasource = type === "size" ? language_size_data : language_count_data;
    const suffix = type === "size" ? " bytes" : " repos";
    // LIST OF LANGUAGES
    const language_dom_list = datasource.map((language) =>
        language.value === 0 ? (
            ""
        ) : (
            <li key={language.key}>
                {" "}
                <span style={{ color: language_color_data[language.key] }}> {language.key} </span>: {language.value} {suffix}
            </li>
        )
    );
    return (
        <div>
            <ol>{language_dom_list}</ol>
        </div>
    );
};

export default Language;
