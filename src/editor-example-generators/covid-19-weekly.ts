import { SurveyEditor } from "../editor-engine/survey-editor/survey-editor";
import { generateLocStrings, generateTitleComponent } from "../editor-engine/utils/simple-generators";
import { SurveyGroupItem } from "survey-engine/lib/data_types";
import { ItemEditor } from "../editor-engine/survey-editor/item-editor";

export const generateCovid19Weekly = () => {
    const survey = new SurveyEditor();
    survey.changeItemKey('survey', 'weekly');

    // define name and description of the survey
    survey.setSurveyName(generateLocStrings(
        new Map([
            ["en", "How do you feel today?"],
            ["de", "Wie fühlen Sie sich?"],
        ])
    ));
    survey.setSurveyDescription(generateLocStrings(
        new Map([
            ["en", "Weekly survey about health status."],
            ["de", "Wöchentliche Fragebogen über den Gesundheitszustand."],
        ])
    ));

    let rootItemEditor = new ItemEditor(survey.findSurveyItem('weekly') as SurveyGroupItem);
    rootItemEditor.setSelectionMethod({ name: 'sequential' });
    survey.updateSurveyItem(rootItemEditor.getItem());

    const rootKey = rootItemEditor.getItem().key;

    // 32 --------------------------------------
    let q32Editor = new ItemEditor(survey.addNewSurveyItem({ itemKey: '32' }, rootKey));
    q32Editor.addComponent('root', generateTitleComponent(new Map([
        ["en", "Have you had any of the following symptoms since your last visit (or in the past weeks, if this is your first visit)?"],
        ["de", "Hatten Sie irgendwelche der folgenden Symptome seit Ihrem letzten Besuch (oder in der letzten Woche, falls dies Ihr erster Besuch ist)?"],
    ])));
    console.log(q32Editor.getItem())
    // TODO: setup question
    survey.updateSurveyItem(q32Editor.getItem());


    console.log(survey.getSurvey());

}