import * as React from "react";
import {Filter,List, Datagrid, Edit, Create, SimpleForm, DateField, TextField, EditButton, TextInput, DateTimeInput,DeleteButton } from 'react-admin';
import SearchIcon from "@material-ui/icons/Search";
import {InputAdornment } from "@material-ui/core";

const ObjFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn resettable helperText={true} InputProps={{
            endAdornment: (
                <InputAdornment>
                    <SearchIcon />
                </InputAdornment>
            )
        }} />
    </Filter>
);
export const objList = props => (
    <List {...props} filters={<ObjFilter/>}>
        <Datagrid>
            <TextField source="id"/>
            <TextField source="tableName"/>
            <DateField source="updateTime"  showTime={true}/>
            <TextField source="status"/>
            <EditButton basePath="/CheckUpdate"/>
            <DeleteButton basePath="/CheckUpdate"/>
        </Datagrid>
    </List>
);

export const objEdit = (props) => (
    <Edit{...props}>
        <SimpleForm>
            <TextInput disabled  source="id" />
            <TextInput source="tableName"/>
            <DateTimeInput source="updateTime" />
            <TextInput source="status"/>
        </SimpleForm>
    </Edit>
);

export const objCreate = (props) => (
    <Create{...props}>
        <SimpleForm>
        <TextInput source="tableName"/>
        <DateTimeInput source="updateTime" />
        <TextInput source="status"/>
        </SimpleForm>
    </Create>
);

