<View
                        style={{
                          backgroundColor: '#F9EEA0',
                          borderRadius: 10,
                          // width: '100%',
                          marginBottom: 20,
                          marginTop: 5,
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'flex-start',
                          paddingVertical: 7,
                          paddingHorizontal: 15,
                          shadowColor: Colors.BLACK1,
                          shadowOffset: {
                            width: 0,
                            height: 1,
                          },
                          shadowOpacity: 0.22,
                          shadowRadius: 2.22,
                          elevation: 3,
                          marginHorizontal: 30
                        }}>
                        <Icon
                            name="warning"
                            size={14}
                            color={Colors.ORANGE}
                            style={{ marginRight: 10 }} 
                            tvParallaxProperties={undefined}                        />
                        <View>
                          <Text12Bold
                            text="Note: Kindly enter the correct name. Name cannot be edited later"
                            textColor={Colors.TEXTDARK}
                            textStyle={{textDecorationLine: 'none'}}
                          />
                        </View>
                      </View>