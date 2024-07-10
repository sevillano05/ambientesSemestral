/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  SwitchField,
  TextField,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { createTodo } from "../graphql/mutations";
const client = generateClient();
export default function TodoCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    taskName: "",
    description: "",
    state: "",
    catergory: "",
    important: false,
    owner: "",
  };
  const [taskName, setTaskName] = React.useState(initialValues.taskName);
  const [description, setDescription] = React.useState(
    initialValues.description
  );
  const [state, setState] = React.useState(initialValues.state);
  const [catergory, setCatergory] = React.useState(initialValues.catergory);
  const [important, setImportant] = React.useState(initialValues.important);
  const [owner, setOwner] = React.useState(initialValues.owner);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setTaskName(initialValues.taskName);
    setDescription(initialValues.description);
    setState(initialValues.state);
    setCatergory(initialValues.catergory);
    setImportant(initialValues.important);
    setOwner(initialValues.owner);
    setErrors({});
  };
  const validations = {
    taskName: [],
    description: [],
    state: [],
    catergory: [],
    important: [],
    owner: [{ type: "Required" }],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          taskName,
          description,
          state,
          catergory,
          important,
          owner,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: createTodo.replaceAll("__typename", ""),
            variables: {
              input: {
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "TodoCreateForm")}
      {...rest}
    >
      <TextField
        label="Task name"
        isRequired={false}
        isReadOnly={false}
        value={taskName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              taskName: value,
              description,
              state,
              catergory,
              important,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.taskName ?? value;
          }
          if (errors.taskName?.hasError) {
            runValidationTasks("taskName", value);
          }
          setTaskName(value);
        }}
        onBlur={() => runValidationTasks("taskName", taskName)}
        errorMessage={errors.taskName?.errorMessage}
        hasError={errors.taskName?.hasError}
        {...getOverrideProps(overrides, "taskName")}
      ></TextField>
      <TextField
        label="Description"
        isRequired={false}
        isReadOnly={false}
        value={description}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              taskName,
              description: value,
              state,
              catergory,
              important,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.description ?? value;
          }
          if (errors.description?.hasError) {
            runValidationTasks("description", value);
          }
          setDescription(value);
        }}
        onBlur={() => runValidationTasks("description", description)}
        errorMessage={errors.description?.errorMessage}
        hasError={errors.description?.hasError}
        {...getOverrideProps(overrides, "description")}
      ></TextField>
      <TextField
        label="State"
        isRequired={false}
        isReadOnly={false}
        value={state}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              taskName,
              description,
              state: value,
              catergory,
              important,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.state ?? value;
          }
          if (errors.state?.hasError) {
            runValidationTasks("state", value);
          }
          setState(value);
        }}
        onBlur={() => runValidationTasks("state", state)}
        errorMessage={errors.state?.errorMessage}
        hasError={errors.state?.hasError}
        {...getOverrideProps(overrides, "state")}
      ></TextField>
      <TextField
        label="Catergory"
        isRequired={false}
        isReadOnly={false}
        value={catergory}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              taskName,
              description,
              state,
              catergory: value,
              important,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.catergory ?? value;
          }
          if (errors.catergory?.hasError) {
            runValidationTasks("catergory", value);
          }
          setCatergory(value);
        }}
        onBlur={() => runValidationTasks("catergory", catergory)}
        errorMessage={errors.catergory?.errorMessage}
        hasError={errors.catergory?.hasError}
        {...getOverrideProps(overrides, "catergory")}
      ></TextField>
      <SwitchField
        label="Important"
        defaultChecked={false}
        isDisabled={false}
        isChecked={important}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              taskName,
              description,
              state,
              catergory,
              important: value,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.important ?? value;
          }
          if (errors.important?.hasError) {
            runValidationTasks("important", value);
          }
          setImportant(value);
        }}
        onBlur={() => runValidationTasks("important", important)}
        errorMessage={errors.important?.errorMessage}
        hasError={errors.important?.hasError}
        {...getOverrideProps(overrides, "important")}
      ></SwitchField>
      <TextField
        label="Owner"
        isRequired={true}
        isReadOnly={false}
        value={owner}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              taskName,
              description,
              state,
              catergory,
              important,
              owner: value,
            };
            const result = onChange(modelFields);
            value = result?.owner ?? value;
          }
          if (errors.owner?.hasError) {
            runValidationTasks("owner", value);
          }
          setOwner(value);
        }}
        onBlur={() => runValidationTasks("owner", owner)}
        errorMessage={errors.owner?.errorMessage}
        hasError={errors.owner?.hasError}
        {...getOverrideProps(overrides, "owner")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
