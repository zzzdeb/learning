################################################################################
# Automatically-generated file. Do not edit!
################################################################################

# Add inputs and outputs from these tool invocations to the build variables 
C_SRCS += \
../src/01_Intro/1.12.c 

OBJS += \
./src/01_Intro/1.12.o 

C_DEPS += \
./src/01_Intro/1.12.d 


# Each subdirectory must supply rules for building sources it contributes
src/01_Intro/%.o: ../src/01_Intro/%.c
	@echo 'Building file: $<'
	@echo 'Invoking: GCC C Compiler'
	gcc -O0 -g3 -Wall -c -fmessage-length=0 -MMD -MP -MF"$(@:%.o=%.d)" -MT"$(@)" -o "$@" "$<"
	@echo 'Finished building: $<'
	@echo ' '

