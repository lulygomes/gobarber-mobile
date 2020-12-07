import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Platform } from 'react-native';
import { format } from 'date-fns';
import Icon from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';

import { useAuth } from '../../hooks/auth'

import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  UserAvatar,
  ProvidersListContainer,
  ProvidersList,
  ProviderContainer,
  ProviderAvatar,
  ProviderName,
  OpenDatePickerButton,
  OpenDatePickerButtonText,
  Calendar,
  Title,
  Schedule,
  Section,
  SectionTitle,
  SectionContent,
  Hour,
  HourText,
} from './styles'
import api from '../../services/api';


interface RouteParams {
  providerId: string;
}

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

interface AvailabilityItem {
  hour: number;
  available: boolean;
}

const CreateAppointment: React.FC = () => {
  const { user } = useAuth();
  const route = useRoute();
  const { goBack } = useNavigation();
  const routeParams = route.params as RouteParams;

  const [availability, setAvailability] = useState<AvailabilityItem[]>([])
  const [showDatePiker, setShowDatePiker] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [providers, setProviders] = useState<Provider[]>([])
  const [selectedProvider, setSelectedProvider] = useState(routeParams.providerId)

  const navigateBack = useCallback(() => {
    goBack();
  }, [goBack])

  useEffect(() => {
    api.get('providers')
      .then(response => {
        setProviders(response.data)
      })
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    api.get(`providers/${selectedProvider}/day-availability`, {
      params: {
        year: selectedDate.getFullYear(),
        month: selectedDate.getMonth() + 1,
        day: selectedDate.getDate(),
      }
    }).then(response => {
      setAvailability(response.data)
    })
  }, [selectedDate, selectedProvider]);


  const handleSelectProvider = useCallback((providerId) => {
    setSelectedProvider(providerId);
  }, [])

  const handleToogleDatePicker = useCallback(() => {
    setShowDatePiker((state) => !state);
  }, [])

  const handleDateChanged = useCallback(
    (event: any, date: Date | undefined) => {
      if (Platform.OS === 'android') {
        setShowDatePiker(false)
      }

      if (selectedDate) {
        setSelectedDate(date)
      }

    }, [])

  const morningAvailability = useMemo(() => {
    return availability
      .filter(({ hour }) => hour < 12)
      .map(({ hour, available }) => {
        return {
          hour,
          available,
          hourFormatted: format(new Date().setHours(hour), 'HH:00'),
        }
      })
  }, [availability])

  const afternoonAvailability = useMemo(() => {
    return availability
      .filter(({ hour }) => hour >= 12)
      .map(({ hour, available }) => {
        return {
          hour,
          available,
          hourFormatted: format(new Date().setHours(hour), 'HH:00'),
        }
      })
  }, [availability])

  return (
    <Container>
      <Header>
        <BackButton onPress={navigateBack}>
          <Icon name="chevron-left" size={24} color="#999591" />
        </BackButton>

        <HeaderTitle> Cabeleireiros </HeaderTitle>

        <UserAvatar source={{ uri: user.avatar_url }} />
      </Header>

      <ProvidersListContainer>
        <ProvidersList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={providers}
          keyExtractor={provider => provider.id}
          renderItem={({ item: provider }) => (
            <ProviderContainer
              selected={provider.id === selectedProvider}
              onPress={() => handleSelectProvider(provider.id)}
            >
              <ProviderAvatar source={{ uri: provider.avatar_url }} />
              <ProviderName
                selected={provider.id === selectedProvider}
              >{provider.name}</ProviderName>
            </ProviderContainer>
          )}
        />
      </ProvidersListContainer>
      <Calendar>
        <Title>Escolha um data</Title>

        <OpenDatePickerButton onPress={handleToogleDatePicker}>
          <OpenDatePickerButtonText>Selecionar outra data</OpenDatePickerButtonText>
        </OpenDatePickerButton>

        {showDatePiker &&
          <DateTimePicker
            mode="date"
            display="calendar"
            onChange={handleDateChanged}
            value={selectedDate}
          />}
      </Calendar>

      <Schedule>
        <Title>Escolha o horário</Title>

        <Section>
          <SectionTitle>Manhã</SectionTitle>

          <SectionContent>
            {morningAvailability.map(({ hourFormatted }) => (
              <Hour key={hourFormatted}>
                <HourText>{hourFormatted}</HourText>
              </Hour>
            ))}
          </SectionContent>
        </Section>

        <Section>
          <SectionTitle>Manhã</SectionTitle>

          <SectionContent>
            {afternoonAvailability.map(({ hourFormatted }) => (
              <Hour key={hourFormatted}>
                <HourText>{hourFormatted}</HourText>
              </Hour>
            ))}
          </SectionContent>
        </Section>

      </Schedule>

    </Container>
  )
}

export default CreateAppointment;
