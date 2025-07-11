export const courseData = {
  _id: "684008d3e6bae99df9b490bc",
  courseId: "cs4404",
  modules: [
    {
      moduleTitle: "Module 1: Basics of IoT",
      submodules: [
        {
          submoduleTitle: "Lecture 1: Introduction to IoT",
          description: "Understand what IoT is and how it is transforming the world.",
          video: {
            videoTitle: "What is IoT?",
            videoUrl: "https://www.youtube.com/embed/QrcjGom1QkQ"
          },
          quiz: {
            questions: [
              {
                questionText: "IoT stands for?",
                options: [
                  "Internet of Technology",
                  "Interface of Things",
                  "Internet of Things",
                  "Integrated of Things"
                ],
                correctAnswer: "Internet of Things"
              },
              {
                questionText: "Which of these is an IoT application?",
                options: [
                  "Smart Home",
                  "Word Processor",
                  "PDF Reader",
                  "Game Console"
                ],
                correctAnswer: "Smart Home"
              }
            ]
          }
        },
        {
          submoduleTitle: "Lecture 2: IoT Architecture",
          description: "Learn about the architecture of IoT systems including edge devices, cloud, and more.",
          video: {
            videoTitle: "IoT Architecture Explained",
            videoUrl: "https://www.youtube.com/embed/aq6CKlDjOnI"
          },
          quiz: {
            questions: [
              {
                questionText: "Which layer includes sensors and actuators?",
                options: ["Perception Layer", "Network Layer", "Application Layer", "Data Layer"],
                correctAnswer: "Perception Layer"
              },
              {
                questionText: "Which layer communicates data to the cloud?",
                options: ["Cloud Layer", "Application Layer", "Network Layer", "Security Layer"],
                correctAnswer: "Network Layer"
              }
            ]
          }
        },
        {
          submoduleTitle: "Lecture 3: Communication Protocols",
          description: "Understand MQTT, CoAP, and other IoT protocols.",
          video: {
            videoTitle: "Protocols in IoT",
            videoUrl: "https://www.youtube.com/embed/EhLGr3z1Czg"
          },
          quiz: {
            questions: [
              {
                questionText: "Which protocol is lightweight and widely used in IoT?",
                options: ["HTTP", "MQTT", "FTP", "SMTP"],
                correctAnswer: "MQTT"
              },
              {
                questionText: "Which protocol is designed for constrained devices?",
                options: ["HTTPS", "CoAP", "TCP", "SCP"],
                correctAnswer: "CoAP"
              }
            ]
          }
        }
      ]
    },
    {
      moduleTitle: "Module 2: IoT Devices & Sensors",
      submodules: [
        {
          submoduleTitle: "Lecture 1: Sensors in IoT",
          description: "Explore the different types of sensors used in IoT applications.",
          video: {
            videoTitle: "Sensors for Smart Systems",
            videoUrl: "https://www.youtube.com/embed/LoB5bUXglHk"
          },
          quiz: {
            questions: [
              {
                questionText: "Which sensor measures temperature?",
                options: ["LDR", "Thermistor", "Ultrasonic", "IR"],
                correctAnswer: "Thermistor"
              },
              {
                questionText: "LDR is used to detect?",
                options: ["Motion", "Light", "Temperature", "Pressure"],
                correctAnswer: "Light"
              }
            ]
          }
        },
        {
          submoduleTitle: "Lecture 2: Actuators",
          description: "Learn how actuators convert signals into physical actions.",
          video: {
            videoTitle: "Actuators in Action",
            videoUrl: "https://www.youtube.com/embed/0n13edbN9ic"
          },
          quiz: {
            questions: [
              {
                questionText: "Which of the following is an actuator?",
                options: ["Thermometer", "LED", "Microphone", "Humidity Sensor"],
                correctAnswer: "LED"
              },
              {
                questionText: "Actuators respond to?",
                options: ["Sound", "Sensor Input", "Mechanical Stress", "Vibration"],
                correctAnswer: "Sensor Input"
              }
            ]
          }
        },
        {
          submoduleTitle: "Lecture 3: Microcontrollers",
          description: "Understand the role of microcontrollers like Arduino and ESP32 in IoT.",
          video: {
            videoTitle: "Microcontrollers in IoT",
            videoUrl: "https://www.youtube.com/embed/Iuz5lICIpT0"
          },
          quiz: {
            questions: [
              {
                questionText: "Which board is commonly used in IoT prototyping?",
                options: ["Raspberry Pi", "ESP32", "Arduino", "All of the above"],
                correctAnswer: "All of the above"
              },
              {
                questionText: "Which is a wireless microcontroller?",
                options: ["ESP32", "ATmega328", "MSP430", "8051"],
                correctAnswer: "ESP32"
              }
            ]
          }
        }
      ]
    },
    {
      moduleTitle: "Module 3: IoT Applications",
      submodules: [
        {
          submoduleTitle: "Lecture 1: Smart Home",
          description: "Learn how IoT is used in home automation systems.",
          video: {
            videoTitle: "IoT for Smart Homes",
            videoUrl: "https://www.youtube.com/embed/A_NXEEyH5pI"
          },
          quiz: {
            questions: [
              {
                questionText: "Which of these is a smart home device?",
                options: ["Smart Bulb", "Smart TV", "Smart Thermostat", "All of the above"],
                correctAnswer: "All of the above"
              },
              {
                questionText: "Which technology is used to control home devices remotely?",
                options: ["Wi-Fi", "Bluetooth", "Zigbee", "All of the above"],
                correctAnswer: "All of the above"
              }
            ]
          }
        },
        {
          submoduleTitle: "Lecture 2: Industrial IoT (IIoT)",
          description: "Explore the use of IoT in manufacturing and industrial automation.",
          video: {
            videoTitle: "IIoT Concepts",
            videoUrl: "https://www.youtube.com/embed/eShd8x3dwJ8"
          },
          quiz: {
            questions: [
              {
                questionText: "IIoT stands for?",
                options: ["Industrial Internet of Things", "Integrated IoT", "Internal IoT", "IoT in Industry"],
                correctAnswer: "Industrial Internet of Things"
              },
              {
                questionText: "Which is a key benefit of IIoT?",
                options: ["Energy Waste", "Manual Reporting", "Predictive Maintenance", "Higher Defects"],
                correctAnswer: "Predictive Maintenance"
              }
            ]
          }
        },
        {
          submoduleTitle: "Lecture 3: IoT and Security",
          description: "Understand privacy and security challenges in IoT.",
          video: {
            videoTitle: "Security in IoT",
            videoUrl: "https://www.youtube.com/embed/0rs8rMVTvMM"
          },
          quiz: {
            questions: [
              {
                questionText: "Which is a security risk in IoT?",
                options: ["Strong Encryption", "Open Ports", "Device Authentication", "Closed Networks"],
                correctAnswer: "Open Ports"
              },
              {
                questionText: "Which method improves IoT security?",
                options: ["Weak Passwords", "Firmware Updates", "No Encryption", "Default Settings"],
                correctAnswer: "Firmware Updates"
              }
            ]
          }
        }
      ]
    }
  ]
};