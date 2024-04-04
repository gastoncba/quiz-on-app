import { useState, useEffect } from 'react';
import { Box, Container, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import {
  Paragraph,
  showToast,
  Loader,
  Button,
  GridList,
  IconButton,
  Icon,
  Modal,
  Form,
  Input,
  Switch,
  List,
  Item,
} from '../../components';
import { Category } from '../../models';
import { CategoryServices } from '../../services';
import { styles, themeMaterial } from '../../settings';

interface HomeProps {}

export const HomeScreen: React.FC<HomeProps> = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { green, blueberry, favorite, star, red } = styles.color;
  const [open, setOpen] = useState<boolean>(false);
  const [optionValue, setOptionValue] = useState<string>('');
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [listItems, setListItems] = useState<Item[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getCategories = async () => {
      try {
        const categories = await CategoryServices.getCategories();
        setCategories(categories);
        setLoading(false);
      } catch (error: any) {
        showToast('Error al consultar las categorias', 'error');
      }
    };

    getCategories();
  }, []);

  const renderColor = (categoryName: string) => {
    switch (categoryName) {
      case 'Ciencia':
        return blueberry;
      case 'Historia':
        return green;
      case 'Arte':
        return favorite;
      case 'Geografía':
        return star;
      case 'Entretenimiento':
        return red;
      default:
        return 'primary.dark';
    }
  };
  const sendQuestion = async (value: any) => {
    console.log(value);
  };

  const addOption = () => {
    if (optionValue.trim() !== '') {
      const nuevaOpcion: Item = {
        primaryText: optionValue.trim(),
        secondaryText: isCorrect ? 'Correcta' : 'Incorrecta',
        value: optionValue.trim(),
        id: listItems.length + 1,
        secondaryTypographyStyles: {
          color: isCorrect ? green : red,
        },
      };

      setListItems([...listItems, nuevaOpcion]);
    }
  };

  //const deleteOption = () => {};
  return (
    <>
      <motion.h3
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Paragraph text={'Categorias'} variant="h3" align="center" />
      </motion.h3>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Paragraph
          text={'Selecciona una categoria para comenzar!'}
          align="center"
        />
      </motion.div>
      {loading ? (
        <Loader />
      ) : (
        <Container maxWidth="sm">
          <GridList
            sxContainer={{ py: 2 }}
            items={categories}
            renderItem={(item: Category) => (
              <Button
                key={item.id}
                title={item.name}
                onClick={() =>
                  navigate('/questionnaire', { state: { category: item } })
                }
                colorHover={renderColor(item.name)}
                style={{
                  bgcolor: renderColor(item.name),
                  width: '100%',
                }}
              />
            )}
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              py: 2,
              alignItems: 'center',
              columnGap: 1,
            }}
          >
            <IconButton
              icon={<Icon type="PLUS" />}
              size="small"
              onClick={() => setOpen(true)}
            />
            <Paragraph text={'Colabora con una pregunta'} />
          </Box>
        </Container>
      )}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Pregunta"
        fullWidth
      >
        <Form
          inputs={[
            {
              type: 'text',
              label: 'Pregunta',
              initialValue: { question: '' },
              multiline: true,
            },
          ]}
          submitText="Guardar"
          onAction={sendQuestion}
        >
          <Grid
            container
            columnSpacing={2}
            rowSpacing={2}
            alignItems={'center'}
          >
            <Grid item md={6} sm={6} xs={12}>
              <Input
                value={optionValue}
                setValue={(value) => setOptionValue(value)}
                size="small"
                label="Opcion"
                multiline
                fullWidth
              />
            </Grid>
            <Grid item md={6} sm={6} xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', columnGap: 2 }}>
                <Box
                  sx={{ display: 'flex', alignItems: 'center', columnGap: 1 }}
                >
                  <Paragraph text={`Es correcta`} />
                  <Paragraph
                    text={`${isCorrect ? 'SI' : 'NO'}`}
                    sx={{ color: isCorrect ? green : red }}
                  />
                </Box>
                <Switch
                  colorOn={themeMaterial.palette.primary.main}
                  colorOff="gray"
                  onChange={(isOn) => setIsCorrect(!isOn)}
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', columnGap: 2 }}>
                <IconButton
                  icon={<Icon type="PLUS" />}
                  size="small"
                  onClick={addOption}
                />
                <Paragraph text={'Agregar opcion'} />
              </Box>
            </Grid>
          </Grid>
          <Box>
            <List
              items={listItems}
              onClick={(item) => console.log(item.value)}
              secondaryAction={
                <IconButton
                  icon={<Icon type="CLOSE" sx={{ fontSize: 18 }} />}
                  size="small"
                  buttonStyle={{ bgcolor: '#bdbdbd' }}
                  colorHover="gray"
                />
              }
            />
          </Box>
        </Form>
      </Modal>
    </>
  );
};
