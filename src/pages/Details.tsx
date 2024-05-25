import { IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { DetailsResult, SearchType, useApi } from '../hooks/useApi';

interface DetailsPageProps
    extends RouteComponentProps<{
        id:string
    }>{}

const Details: React.FC<DetailsPageProps> = ({match}) => {

    const {getDetails} = useApi()
    const [information, setInformation] = useState<DetailsResult | null >(null)

    useIonViewWillEnter(() => {
        const fetchData = async () => {
            const id = match.params.id;
            const data = await getDetails(id);
            setInformation(data);
            console.log(data);
        };
        fetchData(); 
    });

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot='start'>
                          <IonBackButton defaultHref='/home'></IonBackButton>
                    </IonButtons>
                        
                    <IonTitle>Page Title</IonTitle>
                </IonToolbar>
            </IonHeader>


            <IonContent > 

            {information && (
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>
                            {information.Title}
                        </IonCardTitle>
                    </IonCardHeader>

                </IonCard>
            )}




            </IonContent>
        </IonPage>
    );
};

export default Details;