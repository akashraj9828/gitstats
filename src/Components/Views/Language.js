import React from 'react'

const Language = (props) => {
    const languageData = props.languageData
    // default type is count
    const type=props.type;
    
    console.log("---: Language -> languageData", languageData);
    const { language_size_data, language_count_data,language_color_data } = languageData
    const datasource=type==="size"?language_size_data:language_count_data
    const prefix=type==="size"?" bytes":" repos"
    // create a list of items
    const language_dom_list = datasource.map((language) => language.value===0? "" : <li key={language.key}> <span style={{color:language_color_data[language.key]}}> {language.key}  </span>: {language.value} {prefix}</li>)
    return (
        <div>
            <ol>
                {language_dom_list}
            </ol>
        </div>
    )
}

export default Language