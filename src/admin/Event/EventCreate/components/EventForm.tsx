import React, { useState } from 'react';
import RichTextEditor from 'components/RichTextEditor';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useFormik } from 'formik';
import { useSwiper } from 'swiper/react';
import FieldLabel from './FieldLabel';
import { setBasicInfo } from 'redux/form/formSlice';
import { useAppSelector, useAppDispatch } from 'redux/hooks';
import * as yup from 'yup';

enum FieldType {
    title = 'title',
    startDateTime = 'startDateTime',
    endDateTime = 'endDateTime',
    address = 'address',
    limit = 'limit',
    content = 'content'
}

const validationSchema = yup.object({
  title: yup
    .string()
    .trim()
    .required('请输入活动标题'),
  startDateTime: yup
    .date()
    .nullable()
    .required('请选择活动时间'),
  address: yup
    .string()
    .trim()
    .required('请输入活动地点'),
  limit: yup
    .number()
    .min(0, '输入人数无效')
    .required('请输入活动最多限制人数'),
});

const EventForm: React.FC = () => {

  const [description, setDescription] = useState('');
  const swiper = useSwiper();
  const activityForm = useAppSelector(state => state.form.createData.basicInfo);
  const dispatch = useAppDispatch();

  const onSubmit = (values) => {
    return values;
  };
  
  const formik = useFormik({ 
    initialValues: activityForm,
    validationSchema: validationSchema,
    onSubmit,
  });

  const handleFieldValueChange = (e, type: FieldType) => {
    dispatch(setBasicInfo({
      [type]:
        type === FieldType.startDateTime ||
        type === FieldType.endDateTime ||
        type === FieldType.content ? 
          e : e.target.value
    }));
    // 如果是rte传过来的内容 还需要设置一下description 是用于这个组件里显示内容的
    // 设置完之后就可以return了 因为rte和formik没关系
    if (type === FieldType.content) {
      setDescription(e);
      return;
    }
    type === FieldType.startDateTime ||
    type === FieldType.endDateTime ?
      formik.setFieldValue(type, e) :
      formik.handleChange(e);
  };

  return (
    <Box p={'2px'}>
      <form onSubmit={formik.handleSubmit}>
        <Box sx={{ float: 'right' }}>
          <Button
            variant="contained"
            type={'submit'}
            endIcon={<ArrowForwardIcon />}
            onClick={() => swiper.slideNext()}
          >
           配置报名表单
          </Button>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FieldLabel name='活动标题' isRequired />
            <TextField
              label="Title"
              variant="outlined"
              name={'title'}
              fullWidth
              size='small'
              value={formik.values.title}
              onChange={(e) => handleFieldValueChange(e, FieldType.title)}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FieldLabel name='活动开始时间' isRequired />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                label="Date & Time"
                value={formik.values.startDateTime}
                minDateTime={new Date()}
                onChange={(e) => handleFieldValueChange(e, FieldType.startDateTime)}
                renderInput={(params) => 
                  <TextField
                    {...params} 
                    size='small'
                    fullWidth
                    name={'startDateTime'}
                    error={formik.touched.startDateTime && Boolean(formik.errors.startDateTime)}
                    helperText={formik.touched.startDateTime && formik.errors.startDateTime}
                  />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={3}>
            <FieldLabel name='活动结束时间' description='不选择结束时间代表长期有效' />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                label="Date & Time"
                value={formik.values.endDateTime}
                minDateTime={new Date()}
                onChange={(e) => handleFieldValueChange(e, FieldType.endDateTime)}
                renderInput={(params) => 
                  <TextField
                    {...params} 
                    size='small'
                    fullWidth
                    name={'endDateTime'}
                  />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={3}>
            <FieldLabel name='活动地点' isRequired />
            <TextField
              label="Address"
              variant="outlined"
              name={'address'}
              fullWidth
              size='small'
              value={formik.values.address}
              onChange={(e) => handleFieldValueChange(e, FieldType.address)}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FieldLabel name='最多参数人数（0表示不限制）' isRequired />
            <TextField
              label="Member limitation"
              variant="outlined"
              name={'limit'}
              type="number"
              fullWidth
              size='small'
              value={formik.values.limit}
              onChange={(e) => handleFieldValueChange(e, FieldType.limit)}
              error={formik.touched.limit && Boolean(formik.errors.limit)}
              helperText={formik.touched.limit && formik.errors.limit}
            />
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{ mb: 2 }}/>
          </Grid>
        </Grid>
        <Box
          width='100%'
          height='80vh'
          mb={2}
        >
          <FieldLabel name='活动描述' isRequired />
          <RichTextEditor
            content={description}
            setContent={(e) => handleFieldValueChange(e, FieldType.content)}
            height='calc(100% - 21px)'
          />
        </Box>
      </form>
    </Box>
  );
};

export default EventForm;