/*
 * @Author: Shen Shu
 * @Date: 2022-06-03 16:35:33
 * @LastEditors: Shen Shu
 * @LastEditTime: 2022-06-03 19:28:22
 * @FilePath: /uwcssa_ca/src/admin/Activity/Form/components/FormItemForm/FormInputFieldComponent.tsx
 * @Description:
 *
 */

import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from '@mui/material';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { FormItem } from 'redux/form/formSlice';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import React from 'react';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

function getInputFieldName({ order }: { order: number }) {
  return 'content' + order;
}

function FormInputFieldComponent({
  formik,
  formItem,
}: {
  formik: any;
  formItem: FormItem;
}) {
  function getFormikValue({ order }: { order: number }) {
    if (order === 1) {
      return formik.values.content1;
    } else if (order === 2) {
      return formik.values.content2;
    } else if (order === 3) {
      return formik.values.content3;
    } else if (order === 4) {
      return formik.values.content4;
    } else if (order === 5) {
      return formik.values.content5;
    } else if (order === 6) {
      return formik.values.content6;
    } else if (order === 7) {
      return formik.values.content7;
    } else if (order === 8) {
      return formik.values.content8;
    } else if (order === 9) {
      return formik.values.content9;
    } else if (order === 10) {
      return formik.values.content10;
    } else if (order === 11) {
      return formik.values.content11;
    } else if (order === 12) {
      return formik.values.content12;
    } else if (order === 13) {
      return formik.values.content13;
    } else if (order === 14) {
      return formik.values.content14;
    } else if (order === 15) {
      return formik.values.content15;
    } else if (order === 16) {
      return formik.values.content16;
    } else if (order === 17) {
      return formik.values.content17;
    } else if (order === 18) {
      return formik.values.content18;
    } else if (order === 19) {
      return formik.values.content19;
    }
  }
  function getFormikTouched({ order }: { order: number }) {
    if (order === 1) {
      return formik.touched.content1;
    } else if (order === 2) {
      return formik.touched.content2;
    } else if (order === 3) {
      return formik.touched.content3;
    } else if (order === 4) {
      return formik.touched.content4;
    } else if (order === 5) {
      return formik.touched.content5;
    } else if (order === 6) {
      return formik.touched.content6;
    } else if (order === 7) {
      return formik.touched.content7;
    } else if (order === 8) {
      return formik.touched.content8;
    } else if (order === 9) {
      return formik.touched.content9;
    } else if (order === 10) {
      return formik.touched.content10;
    } else if (order === 11) {
      return formik.touched.content11;
    } else if (order === 12) {
      return formik.touched.content12;
    } else if (order === 13) {
      return formik.touched.content13;
    } else if (order === 14) {
      return formik.touched.content14;
    } else if (order === 15) {
      return formik.touched.content15;
    } else if (order === 16) {
      return formik.touched.content16;
    } else if (order === 17) {
      return formik.touched.content17;
    } else if (order === 18) {
      return formik.touched.content18;
    } else if (order === 19) {
      return formik.touched.content19;
    }
  }
  function getFormikErrors({ order }: { order: number }) {
    if (order === 1) {
      return formik.errors.content1;
    } else if (order === 2) {
      return formik.errors.content2;
    } else if (order === 3) {
      return formik.errors.content3;
    } else if (order === 4) {
      return formik.errors.content4;
    } else if (order === 5) {
      return formik.errors.content5;
    } else if (order === 6) {
      return formik.errors.content6;
    } else if (order === 7) {
      return formik.errors.content7;
    } else if (order === 8) {
      return formik.errors.content8;
    } else if (order === 9) {
      return formik.errors.content9;
    } else if (order === 10) {
      return formik.errors.content10;
    } else if (order === 11) {
      return formik.errors.content11;
    } else if (order === 12) {
      return formik.errors.content12;
    } else if (order === 13) {
      return formik.errors.content13;
    } else if (order === 14) {
      return formik.errors.content14;
    } else if (order === 15) {
      return formik.errors.content15;
    } else if (order === 16) {
      return formik.errors.content16;
    } else if (order === 17) {
      return formik.errors.content17;
    } else if (order === 18) {
      return formik.errors.content18;
    } else if (order === 19) {
      return formik.errors.content19;
    }
  }

  function getInputLabelId({ order }: { order: number }) {
    return 'input-label-' + order;
  }
  if (formItem.formType === 'TextFieldShort') {
    return (
      <>
        <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
          Enter your {formItem.name}
        </Typography>
        <TextField
          label={formItem.label}
          variant="outlined"
          name={getInputFieldName({ order: formItem.order })}
          fullWidth
          value={getFormikValue({ order: formItem.order })}
          onChange={formik.handleChange}
          error={
            getFormikTouched({ order: formItem.order }) &&
            Boolean(getFormikErrors({ order: formItem.order }))
          }
          helperText={
            getFormikTouched({ order: formItem.order }) &&
            getFormikErrors({ order: formItem.order })
          }
        />
      </>
    );
  } else if (formItem.formType === 'TextFieldLong') {
    return (
      <>
        <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
          Enter your {formItem.name}
        </Typography>
        <TextField
          label={formItem.label}
          variant="outlined"
          name={getInputFieldName({ order: formItem.order })}
          fullWidth
          minRows={3}
          value={getFormikValue({ order: formItem.order })}
          onChange={formik.handleChange}
          error={
            getFormikTouched({ order: formItem.order }) &&
            Boolean(getFormikErrors({ order: formItem.order }))
          }
          helperText={
            getFormikTouched({ order: formItem.order }) &&
            getFormikErrors({ order: formItem.order })
          }
        />
      </>
    );
  } else if (formItem.formType === 'Checkbox') {
    return (
      <>
        <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
          {formItem.name}
        </Typography>
        <FormControlLabel
          name={getInputFieldName({ order: formItem.order })}
          value={getFormikValue({ order: formItem.order })}
          onChange={formik.handleChange}
          control={<Checkbox />}
          label={formItem.label}
        />
      </>
    );
  } else if (formItem.formType === 'Select') {
    return (
      <>
        <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
          Enter your {formItem.name}
        </Typography>
        <FormControl fullWidth>
          <InputLabel id={getInputLabelId({ order: formItem.order })}>
            {formItem.label}
          </InputLabel>
          <Select
            labelId={getInputLabelId({ order: formItem.order })}
            //id={getInputFieldName({ order: formItem.order })}
            name={getInputFieldName({ order: formItem.order })}
            value={getFormikValue({ order: formItem.order })}
            label={formItem.label}
            onChange={formik.handleChange}
          >
            {formItem.formSelectChoices.map((option, index) => {
              return (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </>
    );
  } else if (formItem.formType === 'FileUpload') {
    return null;
  } else if (formItem.formType === 'RadioGroupH') {
    return (
      <FormControl>
        <FormLabel id={getInputLabelId({ order: formItem.order })}>
          {formItem.label}
        </FormLabel>
        <RadioGroup
          row
          aria-labelledby={getInputLabelId({ order: formItem.order })}
          name={getInputFieldName({ order: formItem.order })}
          onChange={formik.handleChange}
          value={getFormikValue({ order: formItem.order })}
        >
          {formItem.formSelectChoices.map((option, index) => {
            return (
              <FormControlLabel
                key={index}
                value={option}
                control={<Radio />}
                label={option}
              />
            );
          })}
        </RadioGroup>
      </FormControl>
    );
  } else if (formItem.formType === 'RadioGroupV') {
    return (
      <FormControl>
        <FormLabel id={getInputLabelId({ order: formItem.order })}>
          {formItem.label}
        </FormLabel>
        <RadioGroup
          row={false}
          aria-labelledby={getInputLabelId({ order: formItem.order })}
          name={getInputFieldName({ order: formItem.order })}
          onChange={formik.handleChange}
          value={getFormikValue({ order: formItem.order })}
        >
          {formItem.formSelectChoices.map((option, index) => {
            return (
              <FormControlLabel
                key={index}
                value={option}
                control={<Radio />}
                label={option}
              />
            );
          })}
        </RadioGroup>
      </FormControl>
    );
  } else if (formItem.formType === 'DatePicker') {
    return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <MobileDatePicker
          label={formItem.label}
          inputFormat="MM/dd/yyyy"
          value={getFormikValue({ order: formItem.order })}
          onChange={(value) => {
            formik.setFieldValue(
              getInputFieldName({ order: formItem.order }),
              value,
            );
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    );
  } else if (formItem.formType === 'DateTimePicker') {
    return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateTimePicker
          label={formItem.label}
          value={getFormikValue({ order: formItem.order })}
          onChange={(value) => {
            formik.setFieldValue(
              getInputFieldName({ order: formItem.order }),
              value,
            );
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    );
  } else if (formItem.formType === 'TimePicker') {
    return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <TimePicker
          label={formItem.label}
          value={getFormikValue({ order: formItem.order })}
          onChange={(value) => {
            formik.setFieldValue(
              getInputFieldName({ order: formItem.order }),
              value,
            );
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    );
  }
}

export default FormInputFieldComponent;
