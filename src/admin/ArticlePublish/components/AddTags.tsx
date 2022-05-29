/*
 * @Author: 李佳修
 * @Date: 2022-05-21 13:07:23
 * @LastEditTime: 2022-05-21 22:51:23
 * @LastEditors: 李佳修
 * @FilePath: /uwcssa_ca/frontend/src/views/ArticlePublish/components/AddTags.tsx
 */
import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Input from '@mui/material/Input';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
// import TagFacesIcon from '@mui/icons-material/TagFaces';
import IconButton from '@mui/material/IconButton';
import DoneIcon from '@mui/icons-material/Done';
import useMessage from 'hooks/useMessage';

const ListItem = styled('div')(({ theme }) => ({
  marginRight: theme.spacing(),
  marginBottom: theme.spacing(),
}));
interface Tag {
  tagID: string;
  label: string;
}

const AddTags: React.FC<{tagListChange: (tags: Tag[]) => void}> = ({ tagListChange }) => {
  const [tagInput, setTagInput] = React.useState<string>('');
  const [chipData, setChipData] = React.useState<Array<Tag>>([]);
  const message = useMessage();

  useEffect(() => {
    tagListChange(chipData);
  }, [chipData.length]);

  const handleDelete = (chipToDelete) => {
    setChipData((chips) => chips.filter((chip) => chip.tagID !== chipToDelete.tagID));
  };

  const handleTagInputChange = (e) => {
    setTagInput(e.target.value);
  };

  const handleTagInputKeyDown = (e) => {
    if (e.code === 'Enter') {
      addTag();
    }
  };

  const addTag = () => {
    // 判断当前的tag列表里是否有这个tag
    const find = chipData.findIndex((item) => item.tagID === tagInput);
    if (find !== -1) {
      message.open({
        type: 'warning',
        message: `标签【${tagInput}】已存在`
      });
      return;
    }
    // 如果没有
    setChipData((prev) => {
      prev.push({
        tagID: tagInput,
        label: tagInput
      });
      return [...prev];
    });
    setTagInput('');
  };

  return (
    <Card
      sx={{
        margin: 0,
        p: '12px',
        height: '25vh',
      }}
      component="ul"
    >
      <Box
        width='100%'
        display='flex'
      >
        <Input
          fullWidth
          value={tagInput}
          placeholder="添加标签"
          style={{ marginRight: 16 }}
          onKeyDown={(e) => handleTagInputKeyDown(e)}
          onChange={(e) => handleTagInputChange(e)}
        />
        <IconButton
          color="primary"
          component="span"
          onClick={addTag}
        >
          <DoneIcon />
        </IconButton>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignContent: 'flex-start', 
          height: '85%',
          overflow: 'auto',
          padding: '12px 8px'
        }}
      >
        {chipData.map((data) => {
          return (
            <ListItem key={data.tagID}>
              <Chip
                color='primary'
                label={data.label}
                onDelete={() => handleDelete(data)}
              />
            </ListItem>
          );
        })}
      </Box>
    </Card>
  );
};

export default AddTags;