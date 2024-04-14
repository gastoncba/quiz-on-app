import React, { useState, useEffect } from 'react';
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar';
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
  SearchBar,
} from '../../components';
import { Category } from '../../models';
import { CategoryServices } from '../../services';
import { styles, themeMaterial } from '../../settings';
import { Generics } from '../../utils';
import { QuestionServices } from '../../services';

interface HomeProps {}

export const HomeScreen: React.FC<HomeProps> = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { green, blueberry, favorite, star, red } = styles.color;
  const [open, setOpen] = useState<boolean>(false);
  const [optionValue, setOptionValue] = useState<string>('');
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [listItems, setListItems] = useState<Item[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
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
    try {
      if (listItems.length === 0) {
        showToast('Se debe agregar opciones', 'info');
        return;
      }

      if (listItems.length === 1 && listItems[0].value.isCorrect) {
        showToast('Debe existir una opciones incorectas y una sola correcta');
        return;
      }

      if (!listItems.some((item) => item.value.isCorrect)) {
        showToast('Debe existir una opcion correcta', 'info');
        return;
      }

      if (!selectedCategory) {
        showToast('Debe elegir una categoria para la pregunta', 'info');
        return;
      }

      await QuestionServices.createQuestion({
        title: value.question,
        categoryId: selectedCategory?.id,
        options: listItems.map((item) => ({
          value: item.value.optionValue,
          isCorrect: item.value.isCorrect,
        })),
      });
      showToast('Pregunta agregada con exito!', 'success');
      showToast('Muchas gracias 😉');
    } catch (error) {
      showToast('Error al agregar pregunta', 'error');
    } finally {
      setListItems([]);
      resetCategory();
    }
  };

  const addOption = () => {
    if (listItems.some((item) => item.value.isCorrect && isCorrect)) {
      showToast('Solo puede haber una opcion correcta', 'info');
      return;
    }

    if (optionValue.trim() !== '') {
      const nuevaOpcion: Item = {
        primaryText: optionValue.trim(),
        secondaryText: isCorrect ? 'Correcta' : 'Incorrecta',
        value: {
          optionValue: optionValue.trim(),
          isCorrect,
        },
        id: Generics.generateUniqueId(),
        secondaryTypographyStyles: {
          color: isCorrect ? green : red,
        },
        secondaryAction: (
          <IconButton
            icon={<Icon type="CLOSE" sx={{ fontSize: 18 }} />}
            size="small"
            buttonStyle={{ bgcolor: '#bdbdbd' }}
            colorHover="gray"
            onClick={() => deleteOption(optionValue.trim())}
          />
        ),
      };

      setListItems([...listItems, nuevaOpcion]);
      setOptionValue('');
    }
  };

  const deleteOption = (option: string) => {
    setListItems((prevList) =>
      prevList.filter((item) => item.primaryText !== option)
    );
  };

  const changeCategory = (categoryName: string | null) => {
    if (categoryName) {
      const category = categories.find((c) => c.name === categoryName);
      if (category) {
        setSelectedCategory(category);
      }
    } else {
      resetCategory();
    }
  };

  const resetCategory = () => {
    setSelectedCategory(null);
  };

  return (
    <>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Paragraph text={'Categorias'} variant="h3" align="center" />
      </motion.div>
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
                animation
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
        onClose={() => {
          setOpen(false);
          resetCategory();
        }}
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
            <PerfectScrollbar style={{ maxHeight: 230 }}>
              <List items={listItems} />
            </PerfectScrollbar>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'baseline', columnGap: 1 }}>
              <Paragraph text={'Categoria'} />
              {selectedCategory && (
                <Paragraph text={selectedCategory.name} color="primary.dark" />
              )}
            </Box>
            <SearchBar
              options={categories.map((c) => c.name)}
              onChange={(value) => changeCategory(value)}
            />
          </Box>
        </Form>
      </Modal>
    </>
  );
};
